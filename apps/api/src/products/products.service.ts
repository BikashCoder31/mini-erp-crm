import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { AuthenticatedUser } from '../auth/auth.types';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateProductDto } from './dto/create-product.dto';
import type { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import type { ListProductsQueryDto } from './dto/list-products-query.dto';
import type { ListStockMovementsQueryDto } from './dto/list-stock-movements-query.dto';
import type { UpdateProductDto } from './dto/update-product.dto';
import { InventoryService } from './inventory.service';
import { PRODUCT_SELECT, STOCK_MOVEMENT_SELECT } from './products.constants';
import { presentProduct } from './product.presenter';
import { presentStockMovement } from './stock-movement.presenter';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly inventory: InventoryService,
  ) {}

  async list(query: ListProductsQueryDto) {
    const search = query.search || undefined;
    const where: Prisma.ProductWhereInput = {
      ...(query.category
        ? { category: { equals: query.category, mode: 'insensitive' } }
        : {}),
      ...(query.warehouseLocation
        ? {
            warehouseLocation: {
              equals: query.warehouseLocation,
              mode: 'insensitive',
            },
          }
        : {}),
      ...(query.isActive === undefined ? {} : { isActive: query.isActive }),
      ...(query.lowStock === undefined
        ? {}
        : {
            currentStock: query.lowStock
              ? {
                  lte: this.prisma.product.fields.minimumStockAlertQuantity,
                }
              : {
                  gt: this.prisma.product.fields.minimumStockAlertQuantity,
                },
          }),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { sku: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const orderBy: Prisma.ProductOrderByWithRelationInput[] = [
      { [query.sortBy]: query.sortOrder },
      { id: query.sortOrder },
    ];
    const [total, products] = await this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy,
        select: PRODUCT_SELECT,
      }),
    ]);

    return {
      data: products.map(presentProduct),
      meta: this.pagination(query.page, query.limit, total),
    };
  }

  create(dto: CreateProductDto, user: AuthenticatedUser) {
    return this.inventory.createProduct(dto, user);
  }

  async detail(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: {
        ...PRODUCT_SELECT,
        _count: { select: { stockMovements: true } },
        stockMovements: {
          take: 5,
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          select: STOCK_MOVEMENT_SELECT,
        },
      },
    });
    if (!product) this.notFound();

    const { _count, stockMovements, ...data } = product;
    return {
      data: {
        ...presentProduct(data),
        movementCount: _count.stockMovements,
        recentMovements: stockMovements.map(presentStockMovement),
      },
    };
  }

  async update(id: string, dto: UpdateProductDto) {
    if (dto.currentStock !== undefined) {
      throw new ApiException(
        400,
        'CURRENT_STOCK_READ_ONLY',
        'Current stock can only be changed through a stock movement.',
      );
    }
    if (Object.keys(dto).length === 0) {
      throw new ApiException(
        400,
        'EMPTY_UPDATE',
        'At least one field is required.',
      );
    }
    await this.assertExists(id);
    const { currentStock: _currentStock, ...editableFields } = dto;
    void _currentStock;

    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: {
          ...editableFields,
          ...(dto.unitPrice !== undefined
            ? { unitPrice: new Prisma.Decimal(dto.unitPrice) }
            : {}),
        },
        select: PRODUCT_SELECT,
      });
      return { data: presentProduct(product) };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ApiException(
          409,
          'PRODUCT_SKU_ALREADY_EXISTS',
          'A product with this SKU already exists.',
          [{ field: 'sku', message: dto.sku ?? '' }],
        );
      }
      throw error;
    }
  }

  createStockMovement(
    productId: string,
    dto: CreateStockMovementDto,
    user: AuthenticatedUser,
  ) {
    return this.inventory.createManualMovement(productId, dto, user);
  }

  async listMovements(query: ListStockMovementsQueryDto, productId?: string) {
    if (query.from && query.to && new Date(query.from) > new Date(query.to)) {
      throw new ApiException(
        400,
        'VALIDATION_FAILED',
        'The request contains invalid values.',
        [{ field: 'from', message: 'from must not be after to' }],
      );
    }
    if (productId) await this.assertExists(productId);

    const where: Prisma.StockMovementWhereInput = {
      ...(productId || query.productId
        ? { productId: productId ?? query.productId }
        : {}),
      ...(query.movementType ? { movementType: query.movementType } : {}),
      ...(query.referenceType ? { referenceType: query.referenceType } : {}),
      ...(query.createdById ? { createdById: query.createdById } : {}),
      ...(query.challanId ? { challanId: query.challanId } : {}),
      ...(query.from || query.to
        ? {
            createdAt: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lte: new Date(query.to) } : {}),
            },
          }
        : {}),
    };
    const [total, movements] = await this.prisma.$transaction([
      this.prisma.stockMovement.count({ where }),
      this.prisma.stockMovement.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: [{ createdAt: query.sortOrder }, { id: query.sortOrder }],
        select: STOCK_MOVEMENT_SELECT,
      }),
    ]);

    return {
      data: movements.map(presentStockMovement),
      meta: this.pagination(query.page, query.limit, total),
    };
  }

  private async assertExists(id: string): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!product) this.notFound();
  }

  private notFound(): never {
    throw new ApiException(404, 'PRODUCT_NOT_FOUND', 'Product not found.');
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
