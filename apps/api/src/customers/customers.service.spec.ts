import { CustomerStatus, CustomerType, UserRole } from '@prisma/client';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  const count = jest.fn();
  const findMany = jest.fn();
  const create = jest.fn();
  const findUnique = jest.fn();
  const transaction = jest.fn();
  const service = new CustomersService({
    customer: { count, findMany, create, findUnique },
    $transaction: transaction,
  } as unknown as PrismaService);
  const user = {
    id: '7154f07d-55b1-4f25-9a4a-201375475b75',
    name: 'Sales User',
    email: 'sales@example.com',
    role: UserRole.SALES,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects an inverted follow-up date range', async () => {
    await expect(
      service.list({
        page: 1,
        limit: 20,
        sortBy: 'followUpDate',
        sortOrder: 'asc',
        followUpFrom: '2026-08-02T00:00:00.000Z',
        followUpTo: '2026-08-01T00:00:00.000Z',
      }),
    ).rejects.toBeInstanceOf(ApiException);
    expect(transaction).not.toHaveBeenCalled();
  });

  it('returns bounded pagination metadata', async () => {
    count.mockReturnValue('count-query');
    findMany.mockReturnValue('data-query');
    transaction.mockResolvedValue([41, [{ id: 'customer-1' }]]);

    const result = await service.list({
      page: 2,
      limit: 20,
      search: 'acme',
      status: CustomerStatus.LEAD,
      sortBy: 'followUpDate',
      sortOrder: 'asc',
    });

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 20,
        take: 20,
        orderBy: [{ followUpDate: 'asc' }, { id: 'asc' }],
      }),
    );
    expect(result.meta).toEqual({
      page: 2,
      limit: 20,
      total: 41,
      totalPages: 3,
      hasNextPage: true,
      hasPreviousPage: true,
    });
  });

  it('derives creator identity and normalized date fields on create', async () => {
    create.mockResolvedValue({ id: 'customer-1' });
    await service.create(
      {
        name: 'Acme Retail',
        mobileNumber: '+9779812345678',
        email: 'contact@acme.example',
        businessName: 'Acme Retail Pvt. Ltd.',
        customerType: CustomerType.RETAIL,
        address: 'Kathmandu, Nepal',
        status: CustomerStatus.LEAD,
        followUpDate: '2026-08-01T00:00:00.000Z',
        notes: 'Initial contact.',
      },
      user,
    );

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          name: 'Acme Retail',
          mobileNumber: '+9779812345678',
          email: 'contact@acme.example',
          businessName: 'Acme Retail Pvt. Ltd.',
          customerType: CustomerType.RETAIL,
          address: 'Kathmandu, Nepal',
          status: CustomerStatus.LEAD,
          notes: 'Initial contact.',
          createdById: user.id,
          gstNumber: null,
          followUpDate: new Date('2026-08-01T00:00:00.000Z'),
        },
      }),
    );
  });

  it('rejects an empty partial update', async () => {
    await expect(service.update('customer-id', {})).rejects.toBeInstanceOf(
      ApiException,
    );
    expect(findUnique).not.toHaveBeenCalled();
  });
});
