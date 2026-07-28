import { Injectable } from '@nestjs/common';
import { Prisma, StockMovementType, StockReferenceType } from '@prisma/client';
import type { AuthenticatedUser } from '../auth/auth.types';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateProductDto } from './dto/create-product.dto';
import type { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { PRODUCT_SELECT, STOCK_MOVEMENT_SELECT } from './products.constants';
import { presentProduct } from './product.presenter';
import { presentStockMovement } from './stock-movement.presenter';

export type LockedProduct = {
  id: string;
  name: string;
  sku: string;
  isActive: boolean;
  currentStock: number;
};

type UpdatedBalance = { currentStock: number };

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto, user: AuthenticatedUser) {
    try {
      const product = await this.prisma.$transaction(async (transaction) => {
        let created = await transaction.product.create({
          data: {
            name: dto.name,
            sku: dto.sku,
            category: dto.category,
            unitPrice: new Prisma.Decimal(dto.unitPrice),
            minimumStockAlertQuantity: dto.minimumStockAlertQuantity,
            warehouseLocation: dto.warehouseLocation,
            createdById: user.id,
          },
          select: PRODUCT_SELECT,
        });

        if (dto.openingStock > 0) {
          created = await transaction.product.update({
            where: { id: created.id },
            data: { currentStock: dto.openingStock },
            select: PRODUCT_SELECT,
          });
          await transaction.stockMovement.create({
            data: {
              productId: created.id,
              movementType: StockMovementType.IN,
              quantity: dto.openingStock,
              reason: 'Opening stock',
              balanceBefore: 0,
              balanceAfter: dto.openingStock,
              referenceType: StockReferenceType.OPENING_STOCK,
              createdById: user.id,
            },
          });
        }

        return created;
      });
      return { data: presentProduct(product) };
    } catch (error) {
      this.rethrowSkuConflict(error, dto.sku);
    }
  }

  async createManualMovement(
    productId: string,
    dto: CreateStockMovementDto,
    user: AuthenticatedUser,
  ) {
    const maximumAttempts = 3;
    for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
      try {
        const result = await this.prisma.$transaction(
          async (transaction) => {
            const products = await transaction.$queryRaw<LockedProduct[]>`
            SELECT
              id,
              name,
              sku,
              is_active AS "isActive",
              current_stock AS "currentStock"
            FROM products
            WHERE id = CAST(${productId} AS uuid)
            FOR UPDATE
          `;
            const product = products[0];
            if (!product) {
              throw new ApiException(
                404,
                'PRODUCT_NOT_FOUND',
                'Product not found.',
              );
            }
            if (!product.isActive) {
              throw new ApiException(
                409,
                'PRODUCT_INACTIVE',
                'Inactive products cannot receive stock movements.',
                [{ field: 'productId', message: productId }],
              );
            }

            const balanceBefore = product.currentStock;
            if (
              dto.movementType === StockMovementType.OUT &&
              balanceBefore < dto.quantity
            ) {
              this.insufficientStock(
                productId,
                product.sku,
                dto.quantity,
                balanceBefore,
              );
            }

            const updated =
              dto.movementType === StockMovementType.IN
                ? await transaction.$queryRaw<UpdatedBalance[]>`
                  UPDATE products
                  SET current_stock = current_stock + ${dto.quantity},
                      updated_at = NOW()
                  WHERE id = CAST(${productId} AS uuid)
                  RETURNING current_stock AS "currentStock"
                `
                : await transaction.$queryRaw<UpdatedBalance[]>`
                  UPDATE products
                  SET current_stock = current_stock - ${dto.quantity},
                      updated_at = NOW()
                  WHERE id = CAST(${productId} AS uuid)
                    AND current_stock >= ${dto.quantity}
                  RETURNING current_stock AS "currentStock"
                `;
            const balanceAfter = updated[0]?.currentStock;
            if (balanceAfter === undefined) {
              this.insufficientStock(
                productId,
                product.sku,
                dto.quantity,
                balanceBefore,
              );
            }

            const movement = await transaction.stockMovement.create({
              data: {
                productId,
                movementType: dto.movementType,
                quantity: dto.quantity,
                reason: dto.reason,
                balanceBefore,
                balanceAfter,
                referenceType: StockReferenceType.MANUAL_ADJUSTMENT,
                createdById: user.id,
              },
              select: STOCK_MOVEMENT_SELECT,
            });
            return { movement, balanceAfter };
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );

        return {
          data: {
            ...presentStockMovement(result.movement),
            productBalance: result.balanceAfter,
          },
        };
      } catch (error) {
        if (!this.isSerializationConflict(error)) throw error;
        if (attempt < maximumAttempts) continue;
        throw new ApiException(
          409,
          'CONCURRENT_MODIFICATION',
          'The stock changed concurrently. Refresh and try again.',
        );
      }
    }

    throw new ApiException(
      409,
      'CONCURRENT_MODIFICATION',
      'The stock changed concurrently. Refresh and try again.',
    );
  }

  async lockProducts(
    transaction: Prisma.TransactionClient,
    productIds: string[],
  ): Promise<LockedProduct[]> {
    if (productIds.length === 0) return [];
    const sortedIds = [...productIds].sort();
    return transaction.$queryRaw<LockedProduct[]>(
      Prisma.sql`
        SELECT
          id,
          name,
          sku,
          is_active AS "isActive",
          current_stock AS "currentStock"
        FROM products
        WHERE id IN (${Prisma.join(
          sortedIds.map((id) => Prisma.sql`CAST(${id} AS uuid)`),
        )})
        ORDER BY id
        FOR UPDATE
      `,
    );
  }

  async deductForChallan(
    transaction: Prisma.TransactionClient,
    product: LockedProduct,
    quantity: number,
    challanId: string,
    challanNumber: string,
    createdById: string,
  ): Promise<void> {
    const updated = await transaction.$queryRaw<UpdatedBalance[]>`
      UPDATE products
      SET current_stock = current_stock - ${quantity},
          updated_at = NOW()
      WHERE id = CAST(${product.id} AS uuid)
        AND current_stock >= ${quantity}
      RETURNING current_stock AS "currentStock"
    `;
    const balanceAfter = updated[0]?.currentStock;
    if (balanceAfter === undefined) {
      this.insufficientStock(
        product.id,
        product.sku,
        quantity,
        product.currentStock,
      );
    }
    await transaction.stockMovement.create({
      data: {
        productId: product.id,
        movementType: StockMovementType.OUT,
        quantity,
        reason: `Confirmed challan ${challanNumber}`,
        balanceBefore: product.currentStock,
        balanceAfter,
        referenceType: StockReferenceType.CHALLAN_CONFIRMATION,
        challanId,
        createdById,
      },
    });
  }

  async restoreForChallan(
    transaction: Prisma.TransactionClient,
    product: LockedProduct,
    quantity: number,
    challanId: string,
    challanNumber: string,
    reason: string,
    createdById: string,
  ): Promise<void> {
    const updated = await transaction.$queryRaw<UpdatedBalance[]>`
      UPDATE products
      SET current_stock = current_stock + ${quantity},
          updated_at = NOW()
      WHERE id = CAST(${product.id} AS uuid)
      RETURNING current_stock AS "currentStock"
    `;
    const balanceAfter = updated[0]?.currentStock;
    if (balanceAfter === undefined) {
      throw new ApiException(
        409,
        'CONCURRENT_MODIFICATION',
        'The stock changed concurrently. Refresh and try again.',
      );
    }
    await transaction.stockMovement.create({
      data: {
        productId: product.id,
        movementType: StockMovementType.IN,
        quantity,
        reason: `Cancelled challan ${challanNumber}: ${reason}`,
        balanceBefore: product.currentStock,
        balanceAfter,
        referenceType: StockReferenceType.CHALLAN_CANCELLATION,
        challanId,
        createdById,
      },
    });
  }

  private insufficientStock(
    productId: string,
    sku: string,
    requestedQuantity: number,
    availableQuantity: number,
  ): never {
    throw new ApiException(
      409,
      'INSUFFICIENT_STOCK',
      'The requested stock reduction exceeds the available quantity.',
      [
        { field: 'productId', message: productId },
        { field: 'sku', message: sku },
        {
          field: 'requestedQuantity',
          message: String(requestedQuantity),
        },
        {
          field: 'availableQuantity',
          message: String(availableQuantity),
        },
      ],
    );
  }

  private rethrowSkuConflict(error: unknown, sku: string): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ApiException(
        409,
        'PRODUCT_SKU_ALREADY_EXISTS',
        'A product with this SKU already exists.',
        [{ field: 'sku', message: sku }],
      );
    }
    throw error;
  }

  private isSerializationConflict(error: unknown): boolean {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return false;
    return (
      error.code === 'P2034' ||
      (error.code === 'P2010' && error.meta?.code === '40001')
    );
  }
}
