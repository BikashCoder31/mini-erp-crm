import { PrismaService } from '../prisma/prisma.service';
import { ApiException } from '../common/exceptions/api.exception';
import { InventoryService } from './inventory.service';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  const count = jest.fn();
  const findMany = jest.fn();
  const findUnique = jest.fn();
  const update = jest.fn();
  const transaction = jest.fn();
  const thresholdField = Symbol('minimumStockAlertQuantity');
  const service = new ProductsService(
    {
      product: {
        count,
        findMany,
        findUnique,
        update,
        fields: { minimumStockAlertQuantity: thresholdField },
      },
      stockMovement: {},
      $transaction: transaction,
    } as unknown as PrismaService,
    {} as InventoryService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds the low-stock comparison in the database query', async () => {
    count.mockReturnValue('count-query');
    findMany.mockReturnValue('data-query');
    transaction.mockResolvedValue([0, []]);

    await service.list({
      page: 1,
      limit: 20,
      lowStock: true,
      sortBy: 'updatedAt',
      sortOrder: 'desc',
    });

    expect(count).toHaveBeenCalledWith({
      where: {
        currentStock: { lte: thresholdField },
      },
    });
  });

  it('rejects direct current-stock writes', async () => {
    try {
      await service.update('2154f07d-55b1-4f25-9a4a-201375475b75', {
        currentStock: 10,
      });
      throw new Error('Expected update to reject');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiException);
      if (error instanceof ApiException) {
        expect(error.getResponse()).toMatchObject({
          code: 'CURRENT_STOCK_READ_ONLY',
        });
      }
    }
    expect(update).not.toHaveBeenCalled();
  });

  it('rejects an empty metadata update', async () => {
    await expect(
      service.update('2154f07d-55b1-4f25-9a4a-201375475b75', {}),
    ).rejects.toBeInstanceOf(ApiException);
    expect(findUnique).not.toHaveBeenCalled();
  });
});
