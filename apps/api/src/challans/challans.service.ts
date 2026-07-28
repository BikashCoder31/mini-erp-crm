import { Injectable } from '@nestjs/common';
import { ChallanStatus, Prisma, UserRole } from '@prisma/client';
import type { AuthenticatedUser } from '../auth/auth.types';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import {
  InventoryService,
  type LockedProduct,
} from '../products/inventory.service';
import { ChallanNumberService } from './challan-number.service';
import {
  CHALLAN_DETAIL_SELECT,
  CHALLAN_LIST_SELECT,
} from './challans.constants';
import type { CancelChallanDto } from './dto/cancel-challan.dto';
import type {
  ChallanItemInputDto,
  CreateChallanDto,
} from './dto/create-challan.dto';
import type { ListChallansQueryDto } from './dto/list-challans-query.dto';
import type { UpdateDraftChallanDto } from './dto/update-draft-challan.dto';
import {
  presentChallanDetail,
  presentChallanListItem,
} from './challan.presenter';

type LockedChallan = {
  id: string;
  challanNumber: string;
  status: ChallanStatus;
};

type DraftItemData = {
  productId: string;
  lineNumber: number;
  productNameSnapshot: string;
  productSkuSnapshot: string;
  productCategorySnapshot: string;
  unitPriceSnapshot: Prisma.Decimal;
  warehouseLocationSnapshot: string;
  quantity: number;
  lineTotal: Prisma.Decimal;
};

@Injectable()
export class ChallansService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly inventory: InventoryService,
    private readonly numbers: ChallanNumberService,
  ) {}

  async list(query: ListChallansQueryDto) {
    if (
      query.createdFrom &&
      query.createdTo &&
      new Date(query.createdFrom) > new Date(query.createdTo)
    ) {
      throw new ApiException(
        400,
        'VALIDATION_FAILED',
        'The request contains invalid values.',
        [
          {
            field: 'createdFrom',
            message: 'createdFrom must not be after createdTo',
          },
        ],
      );
    }
    const search = query.search || undefined;
    const where: Prisma.ChallanWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.customerId ? { customerId: query.customerId } : {}),
      ...(query.createdById ? { createdById: query.createdById } : {}),
      ...(query.createdFrom || query.createdTo
        ? {
            createdAt: {
              ...(query.createdFrom
                ? { gte: new Date(query.createdFrom) }
                : {}),
              ...(query.createdTo ? { lte: new Date(query.createdTo) } : {}),
            },
          }
        : {}),
      ...(search
        ? {
            OR: [
              {
                challanNumber: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                customer: {
                  name: { contains: search, mode: 'insensitive' },
                },
              },
              {
                customer: {
                  businessName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }
        : {}),
    };
    const orderBy: Prisma.ChallanOrderByWithRelationInput[] = [
      { [query.sortBy]: query.sortOrder },
      { id: query.sortOrder },
    ];
    const [total, challans] = await this.prisma.$transaction([
      this.prisma.challan.count({ where }),
      this.prisma.challan.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy,
        select: CHALLAN_LIST_SELECT,
      }),
    ]);
    return {
      data: challans.map(presentChallanListItem),
      meta: this.pagination(query.page, query.limit, total),
    };
  }

  async create(dto: CreateChallanDto, user: AuthenticatedUser) {
    const id = await this.prisma.$transaction(async (transaction) => {
      const draft = await this.buildDraft(
        transaction,
        dto.customerId,
        dto.items,
      );
      const number = await this.numbers.next(transaction);
      const challan = await transaction.challan.create({
        data: {
          ...number,
          customerId: dto.customerId,
          totalQuantity: draft.totalQuantity,
          totalAmount: draft.totalAmount,
          createdById: user.id,
          items: { create: draft.items },
        },
        select: { id: true },
      });
      return challan.id;
    });
    return this.detail(id);
  }

  async detail(id: string) {
    const challan = await this.prisma.challan.findUnique({
      where: { id },
      select: CHALLAN_DETAIL_SELECT,
    });
    if (!challan) this.notFound();
    return { data: presentChallanDetail(challan) };
  }

  async updateDraft(id: string, dto: UpdateDraftChallanDto) {
    await this.prisma.$transaction(async (transaction) => {
      const challan = await this.lockChallan(transaction, id);
      this.requireDraft(challan);
      const draft = await this.buildDraft(
        transaction,
        dto.customerId,
        dto.items,
      );
      await transaction.challanItem.deleteMany({ where: { challanId: id } });
      await transaction.challan.update({
        where: { id },
        data: {
          customerId: dto.customerId,
          totalQuantity: draft.totalQuantity,
          totalAmount: draft.totalAmount,
          items: { create: draft.items },
        },
      });
    });
    return this.detail(id);
  }

  async confirm(id: string, user: AuthenticatedUser) {
    try {
      await this.prisma.$transaction(async (transaction) => {
        const challan = await this.lockChallan(transaction, id);
        this.requireDraft(challan);
        const items = await transaction.challanItem.findMany({
          where: { challanId: id },
          select: { productId: true, quantity: true },
          orderBy: { productId: 'asc' },
        });
        if (items.length === 0) {
          throw new ApiException(
            409,
            'CHALLAN_STATE_CONFLICT',
            'A challan without items cannot be confirmed.',
          );
        }

        const products = await this.inventory.lockProducts(
          transaction,
          items.map((item) => item.productId),
        );
        this.assertLockedProducts(items, products);
        const productById = new Map(
          products.map((product) => [product.id, product]),
        );
        const inactive = items
          .map((item) => productById.get(item.productId))
          .filter((product): product is LockedProduct => Boolean(product))
          .filter((product) => !product.isActive);
        if (inactive.length > 0) {
          throw new ApiException(
            409,
            'PRODUCT_INACTIVE',
            'One or more products are inactive.',
            inactive.map((product) => ({
              productId: product.id,
              sku: product.sku,
              productName: product.name,
            })),
          );
        }

        const insufficient = items.flatMap((item) => {
          const product = productById.get(item.productId)!;
          return product.currentStock < item.quantity
            ? [
                {
                  productId: product.id,
                  sku: product.sku,
                  productName: product.name,
                  requestedQuantity: item.quantity,
                  availableQuantity: product.currentStock,
                },
              ]
            : [];
        });
        if (insufficient.length > 0) {
          throw new ApiException(
            409,
            'INSUFFICIENT_STOCK',
            'One or more products do not have sufficient stock.',
            insufficient,
          );
        }

        for (const item of items) {
          await this.inventory.deductForChallan(
            transaction,
            productById.get(item.productId)!,
            item.quantity,
            id,
            challan.challanNumber,
            user.id,
          );
        }
        await transaction.challan.update({
          where: { id },
          data: {
            status: ChallanStatus.CONFIRMED,
            confirmedById: user.id,
            confirmedAt: new Date(),
          },
        });
      });
    } catch (error) {
      this.rethrowTransactionConflict(error);
    }
    return this.detail(id);
  }

  async cancel(id: string, dto: CancelChallanDto, user: AuthenticatedUser) {
    try {
      await this.prisma.$transaction(async (transaction) => {
        const challan = await this.lockChallan(transaction, id);
        if (challan.status === ChallanStatus.CANCELLED) {
          throw new ApiException(
            409,
            'CHALLAN_ALREADY_CANCELLED',
            'This challan is already cancelled.',
          );
        }
        if (challan.status === ChallanStatus.CONFIRMED) {
          if (user.role !== UserRole.ADMIN) {
            throw new ApiException(
              403,
              'FORBIDDEN_ROLE',
              'Only an Admin can cancel a Confirmed challan.',
            );
          }
          if (!dto.reason) {
            throw new ApiException(
              400,
              'VALIDATION_FAILED',
              'A cancellation reason is required for a Confirmed challan.',
              [{ field: 'reason', message: 'reason is required' }],
            );
          }
          const items = await transaction.challanItem.findMany({
            where: { challanId: id },
            select: { productId: true, quantity: true },
            orderBy: { productId: 'asc' },
          });
          const products = await this.inventory.lockProducts(
            transaction,
            items.map((item) => item.productId),
          );
          this.assertLockedProducts(items, products);
          const productById = new Map(
            products.map((product) => [product.id, product]),
          );
          for (const item of items) {
            await this.inventory.restoreForChallan(
              transaction,
              productById.get(item.productId)!,
              item.quantity,
              id,
              challan.challanNumber,
              dto.reason,
              user.id,
            );
          }
        }

        await transaction.challan.update({
          where: { id },
          data: {
            status: ChallanStatus.CANCELLED,
            cancelledById: user.id,
            cancelledAt: new Date(),
            cancellationReason: dto.reason ?? null,
          },
        });
      });
    } catch (error) {
      this.rethrowTransactionConflict(error);
    }
    return this.detail(id);
  }

  private async buildDraft(
    transaction: Prisma.TransactionClient,
    customerId: string,
    items: ChallanItemInputDto[],
  ) {
    const seen = new Set<string>();
    for (const item of items) {
      if (seen.has(item.productId)) {
        throw new ApiException(
          400,
          'DUPLICATE_CHALLAN_PRODUCT',
          'A product can appear only once in a challan.',
          { productId: item.productId },
        );
      }
      seen.add(item.productId);
    }
    const customer = await transaction.customer.findUnique({
      where: { id: customerId },
      select: { id: true },
    });
    if (!customer) {
      throw new ApiException(404, 'CUSTOMER_NOT_FOUND', 'Customer not found.');
    }
    const products = await transaction.product.findMany({
      where: { id: { in: [...seen] } },
      select: {
        id: true,
        name: true,
        sku: true,
        category: true,
        unitPrice: true,
        warehouseLocation: true,
        isActive: true,
      },
    });
    const productById = new Map(
      products.map((product) => [product.id, product]),
    );
    const missingId = items.find(
      (item) => !productById.has(item.productId),
    )?.productId;
    if (missingId) {
      throw new ApiException(404, 'PRODUCT_NOT_FOUND', 'Product not found.', {
        productId: missingId,
      });
    }
    const inactive = products.filter((product) => !product.isActive);
    if (inactive.length > 0) {
      throw new ApiException(
        409,
        'PRODUCT_INACTIVE',
        'Inactive products cannot be added to a challan.',
        inactive.map((product) => ({
          productId: product.id,
          sku: product.sku,
          productName: product.name,
        })),
      );
    }

    let totalQuantity = 0;
    let totalAmount = new Prisma.Decimal(0);
    const draftItems: DraftItemData[] = items.map((item, index) => {
      const product = productById.get(item.productId)!;
      const lineTotal = product.unitPrice.mul(item.quantity);
      totalQuantity += item.quantity;
      totalAmount = totalAmount.add(lineTotal);
      return {
        productId: product.id,
        lineNumber: index + 1,
        productNameSnapshot: product.name,
        productSkuSnapshot: product.sku,
        productCategorySnapshot: product.category,
        unitPriceSnapshot: product.unitPrice,
        warehouseLocationSnapshot: product.warehouseLocation,
        quantity: item.quantity,
        lineTotal,
      };
    });
    return { totalQuantity, totalAmount, items: draftItems };
  }

  private async lockChallan(
    transaction: Prisma.TransactionClient,
    id: string,
  ): Promise<LockedChallan> {
    const rows = await transaction.$queryRaw<LockedChallan[]>`
      SELECT
        id,
        challan_number AS "challanNumber",
        status
      FROM challans
      WHERE id = CAST(${id} AS uuid)
      FOR UPDATE
    `;
    const challan = rows[0];
    if (!challan) this.notFound();
    return challan;
  }

  private requireDraft(challan: LockedChallan): void {
    if (challan.status !== ChallanStatus.DRAFT) {
      throw new ApiException(
        409,
        'CHALLAN_NOT_DRAFT',
        'Only a Draft challan can be changed.',
        { currentStatus: challan.status },
      );
    }
  }

  private assertLockedProducts(
    items: ChallanItemInputDto[],
    products: LockedProduct[],
  ): void {
    if (products.length !== items.length) {
      throw new ApiException(
        409,
        'CHALLAN_STATE_CONFLICT',
        'One or more referenced products no longer exist.',
      );
    }
  }

  private rethrowTransactionConflict(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2034'
    ) {
      throw new ApiException(
        409,
        'CONCURRENT_MODIFICATION',
        'The record changed concurrently. Refresh and try again.',
      );
    }
    throw error;
  }

  private notFound(): never {
    throw new ApiException(404, 'CHALLAN_NOT_FOUND', 'Challan not found.');
  }

  private pagination(page: number, limit: number, total: number) {
    const totalPages = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }
}
