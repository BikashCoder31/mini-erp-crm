import {
  Prisma,
  StockMovementType,
  StockReferenceType,
  UserRole,
} from '@prisma/client';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  const productCreate = jest.fn();
  const productUpdate = jest.fn();
  const movementCreate = jest.fn();
  const queryRaw = jest.fn();
  const transaction = jest.fn();
  const prisma = {
    product: {},
    $transaction: transaction,
  } as unknown as PrismaService;
  const service = new InventoryService(prisma);
  const user = {
    id: '7154f07d-55b1-4f25-9a4a-201375475b75',
    name: 'Warehouse User',
    email: 'warehouse@example.com',
    role: UserRole.WAREHOUSE,
  };
  const product = {
    id: '2154f07d-55b1-4f25-9a4a-201375475b75',
    name: 'Industrial Adhesive 5L',
    sku: 'ADH-005L',
    category: 'Adhesives',
    unitPrice: new Prisma.Decimal('1250.00'),
    currentStock: 0,
    minimumStockAlertQuantity: 3,
    warehouseLocation: 'A-01',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: { id: user.id, name: user.name },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    transaction.mockImplementation((callback: (client: unknown) => unknown) =>
      callback({
        product: { create: productCreate, update: productUpdate },
        stockMovement: { create: movementCreate },
        $queryRaw: queryRaw,
      }),
    );
  });

  it('creates opening stock and its audit movement atomically', async () => {
    productCreate.mockResolvedValue(product);
    productUpdate.mockResolvedValue({ ...product, currentStock: 10 });

    const result = await service.createProduct(
      {
        name: product.name,
        sku: product.sku,
        category: product.category,
        unitPrice: '1250.00',
        openingStock: 10,
        minimumStockAlertQuantity: 3,
        warehouseLocation: 'A-01',
      },
      user,
    );

    expect(productUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: product.id },
        data: { currentStock: 10 },
      }),
    );
    const openingMovementCalls = movementCreate.mock.calls as unknown as Array<
      [{ data: Record<string, unknown> }]
    >;
    const openingMovementCall = openingMovementCalls[0][0];
    expect(openingMovementCall.data).toMatchObject({
      movementType: StockMovementType.IN,
      quantity: 10,
      balanceBefore: 0,
      balanceAfter: 10,
      referenceType: StockReferenceType.OPENING_STOCK,
      createdById: user.id,
    });
    expect(result.data.currentStock).toBe(10);
  });

  it('does not create a zero-quantity opening movement', async () => {
    productCreate.mockResolvedValue(product);

    await service.createProduct(
      {
        name: product.name,
        sku: product.sku,
        category: product.category,
        unitPrice: '1250.00',
        openingStock: 0,
        minimumStockAlertQuantity: 3,
        warehouseLocation: 'A-01',
      },
      user,
    );

    expect(productUpdate).not.toHaveBeenCalled();
    expect(movementCreate).not.toHaveBeenCalled();
  });

  it('creates exact before and after balances for stock IN', async () => {
    queryRaw
      .mockResolvedValueOnce([
        {
          id: product.id,
          sku: product.sku,
          isActive: true,
          currentStock: 10,
        },
      ])
      .mockResolvedValueOnce([{ currentStock: 14 }]);
    movementCreate.mockImplementation(
      ({ data }: { data: Record<string, unknown> }) => ({
        id: 'movement-1',
        ...data,
      }),
    );

    const result = await service.createManualMovement(
      product.id,
      {
        movementType: StockMovementType.IN,
        quantity: 4,
        reason: 'Supplier delivery',
      },
      user,
    );

    const stockInCalls = movementCreate.mock.calls as unknown as Array<
      [{ data: Record<string, unknown> }]
    >;
    const stockInCall = stockInCalls[0][0];
    expect(stockInCall.data).toMatchObject({
      balanceBefore: 10,
      balanceAfter: 14,
      referenceType: StockReferenceType.MANUAL_ADJUSTMENT,
    });
    expect(result.data.productBalance).toBe(14);
  });

  it('retries a PostgreSQL serialization conflict before applying movement', async () => {
    transaction.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError('serialization conflict', {
        code: 'P2010',
        clientVersion: '6.19.0',
        meta: { code: '40001' },
      }),
    );
    queryRaw
      .mockResolvedValueOnce([
        {
          id: product.id,
          sku: product.sku,
          isActive: true,
          currentStock: 10,
        },
      ])
      .mockResolvedValueOnce([{ currentStock: 14 }]);
    movementCreate.mockImplementation(
      ({ data }: { data: Record<string, unknown> }) => ({
        id: 'movement-after-retry',
        ...data,
      }),
    );

    const result = await service.createManualMovement(
      product.id,
      {
        movementType: StockMovementType.IN,
        quantity: 4,
        reason: 'Supplier delivery after a concurrent write',
      },
      user,
    );

    expect(transaction).toHaveBeenCalledTimes(2);
    expect(result.data.productBalance).toBe(14);
    expect(movementCreate).toHaveBeenCalledTimes(1);
  });

  it('rejects excessive stock OUT without creating a movement', async () => {
    queryRaw.mockResolvedValueOnce([
      {
        id: product.id,
        sku: product.sku,
        isActive: true,
        currentStock: 3,
      },
    ]);

    await expect(
      service.createManualMovement(
        product.id,
        {
          movementType: StockMovementType.OUT,
          quantity: 4,
          reason: 'Damaged stock',
        },
        user,
      ),
    ).rejects.toBeInstanceOf(ApiException);
    expect(queryRaw).toHaveBeenCalledTimes(1);
    expect(movementCreate).not.toHaveBeenCalled();
  });

  it('rejects movements for inactive products', async () => {
    queryRaw.mockResolvedValueOnce([
      {
        id: product.id,
        sku: product.sku,
        isActive: false,
        currentStock: 3,
      },
    ]);

    await expect(
      service.createManualMovement(
        product.id,
        {
          movementType: StockMovementType.IN,
          quantity: 2,
          reason: 'Unexpected return',
        },
        user,
      ),
    ).rejects.toBeInstanceOf(ApiException);
    expect(movementCreate).not.toHaveBeenCalled();
  });
});
