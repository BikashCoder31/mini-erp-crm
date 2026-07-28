import { ChallanStatus, Prisma, UserRole } from '@prisma/client';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from '../products/inventory.service';
import { ChallansService } from './challans.service';

describe('ChallansService', () => {
  const transaction = jest.fn();
  const detailFindUnique = jest.fn();
  const customerFindUnique = jest.fn();
  const productsFindMany = jest.fn();
  const challanCreate = jest.fn();
  const challanUpdate = jest.fn();
  const itemFindMany = jest.fn();
  const itemDeleteMany = jest.fn();
  const queryRaw = jest.fn();
  const numberNext = jest.fn();
  const lockProducts = jest.fn();
  const deductForChallan = jest.fn();
  const restoreForChallan = jest.fn();
  const tx = {
    customer: { findUnique: customerFindUnique },
    product: { findMany: productsFindMany },
    challan: { create: challanCreate, update: challanUpdate },
    challanItem: {
      findMany: itemFindMany,
      deleteMany: itemDeleteMany,
    },
    $queryRaw: queryRaw,
  };
  const service = new ChallansService(
    {
      challan: { findUnique: detailFindUnique },
      $transaction: transaction,
    } as unknown as PrismaService,
    {
      lockProducts,
      deductForChallan,
      restoreForChallan,
    } as unknown as InventoryService,
    { next: numberNext },
  );
  const sales = {
    id: '7154f07d-55b1-4f25-9a4a-201375475b75',
    name: 'Sales User',
    email: 'sales@example.com',
    role: UserRole.SALES,
  };
  const customerId = '3154f07d-55b1-4f25-9a4a-201375475b75';
  const productAId = '4154f07d-55b1-4f25-9a4a-201375475b75';
  const productBId = '5154f07d-55b1-4f25-9a4a-201375475b75';

  beforeEach(() => {
    jest.clearAllMocks();
    transaction.mockImplementation((callback: (client: unknown) => unknown) =>
      callback(tx),
    );
  });

  it('rejects duplicate product IDs before database reads', async () => {
    await expect(
      service.create(
        {
          customerId,
          items: [
            { productId: productAId, quantity: 1 },
            { productId: productAId, quantity: 2 },
          ],
        },
        sales,
      ),
    ).rejects.toBeInstanceOf(ApiException);
    expect(customerFindUnique).not.toHaveBeenCalled();
  });

  it('captures server product snapshots and exact decimal totals in a Draft', async () => {
    customerFindUnique.mockResolvedValue({ id: customerId });
    productsFindMany.mockResolvedValue([
      {
        id: productAId,
        name: 'Cable',
        sku: 'CBL-1',
        category: 'Electrical',
        unitPrice: new Prisma.Decimal('100.50'),
        warehouseLocation: 'A-01',
        isActive: true,
      },
      {
        id: productBId,
        name: 'Adapter',
        sku: 'ADP-1',
        category: 'Electrical',
        unitPrice: new Prisma.Decimal('25.25'),
        warehouseLocation: 'B-01',
        isActive: true,
      },
    ]);
    numberNext.mockResolvedValue({
      sequenceNumber: 1,
      challanNumber: 'CH-2026-000001',
    });
    challanCreate.mockResolvedValue({ id: 'challan-1' });
    detailFindUnique.mockResolvedValue({
      id: 'challan-1',
      totalAmount: new Prisma.Decimal('352.00'),
      items: [],
    });

    await service.create(
      {
        customerId,
        items: [
          { productId: productAId, quantity: 3 },
          { productId: productBId, quantity: 2 },
        ],
      },
      sales,
    );

    const calls = challanCreate.mock.calls as unknown as Array<
      [
        {
          data: {
            totalQuantity: number;
            totalAmount: Prisma.Decimal;
            items: { create: Array<Record<string, unknown>> };
          };
        },
      ]
    >;
    expect(calls[0][0].data.totalQuantity).toBe(5);
    expect(calls[0][0].data.totalAmount.toFixed(2)).toBe('352.00');
    expect(calls[0][0].data.items.create[0]).toMatchObject({
      productNameSnapshot: 'Cable',
      productSkuSnapshot: 'CBL-1',
      quantity: 3,
    });
    expect(deductForChallan).not.toHaveBeenCalled();
  });

  it('collects insufficient stock before any deduction', async () => {
    queryRaw.mockResolvedValue([
      {
        id: 'challan-1',
        challanNumber: 'CH-2026-000001',
        status: ChallanStatus.DRAFT,
      },
    ]);
    itemFindMany.mockResolvedValue([
      { productId: productAId, quantity: 4 },
      { productId: productBId, quantity: 2 },
    ]);
    lockProducts.mockResolvedValue([
      {
        id: productAId,
        name: 'Cable',
        sku: 'CBL-1',
        isActive: true,
        currentStock: 3,
      },
      {
        id: productBId,
        name: 'Adapter',
        sku: 'ADP-1',
        isActive: true,
        currentStock: 1,
      },
    ]);

    await expect(service.confirm('challan-1', sales)).rejects.toBeInstanceOf(
      ApiException,
    );
    expect(deductForChallan).not.toHaveBeenCalled();
    expect(challanUpdate).not.toHaveBeenCalled();
  });

  it('prevents Sales from reversing a Confirmed challan', async () => {
    queryRaw.mockResolvedValue([
      {
        id: 'challan-1',
        challanNumber: 'CH-2026-000001',
        status: ChallanStatus.CONFIRMED,
      },
    ]);

    await expect(
      service.cancel('challan-1', { reason: 'Customer cancellation' }, sales),
    ).rejects.toBeInstanceOf(ApiException);
    expect(restoreForChallan).not.toHaveBeenCalled();
  });

  it('cancels a Draft without touching stock', async () => {
    queryRaw.mockResolvedValue([
      {
        id: 'challan-1',
        challanNumber: 'CH-2026-000001',
        status: ChallanStatus.DRAFT,
      },
    ]);
    detailFindUnique.mockResolvedValue({
      id: 'challan-1',
      totalAmount: new Prisma.Decimal('100.00'),
      items: [],
    });

    await service.cancel(
      'challan-1',
      { reason: 'Customer changed request' },
      sales,
    );

    expect(restoreForChallan).not.toHaveBeenCalled();
    const updateCalls = challanUpdate.mock.calls as unknown as Array<
      [{ data: Record<string, unknown> }]
    >;
    expect(updateCalls[0][0].data).toMatchObject({
      status: ChallanStatus.CANCELLED,
    });
  });
});
