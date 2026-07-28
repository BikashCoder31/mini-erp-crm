import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CUSTOMER_SELECT } from './customers.constants';
import type { CreateCustomerDto } from './dto/create-customer.dto';
import type { CreateFollowUpDto } from './dto/create-follow-up.dto';
import type { ListCustomersQueryDto } from './dto/list-customers-query.dto';
import type { ListFollowUpsQueryDto } from './dto/list-follow-ups-query.dto';
import type { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListCustomersQueryDto) {
    if (
      query.followUpFrom &&
      query.followUpTo &&
      new Date(query.followUpFrom) > new Date(query.followUpTo)
    ) {
      throw new ApiException(
        400,
        'VALIDATION_FAILED',
        'The request contains invalid values.',
        [
          {
            field: 'followUpFrom',
            message: 'followUpFrom must not be after followUpTo',
          },
        ],
      );
    }

    const search = query.search || undefined;
    const where: Prisma.CustomerWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.customerType ? { customerType: query.customerType } : {}),
      ...(query.followUpFrom || query.followUpTo
        ? {
            followUpDate: {
              ...(query.followUpFrom
                ? { gte: new Date(query.followUpFrom) }
                : {}),
              ...(query.followUpTo ? { lte: new Date(query.followUpTo) } : {}),
            },
          }
        : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { businessName: { contains: search, mode: 'insensitive' } },
              { mobileNumber: { contains: search } },
              { email: { contains: search, mode: 'insensitive' } },
              { gstNumber: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const skip = (query.page - 1) * query.limit;
    const orderBy: Prisma.CustomerOrderByWithRelationInput[] = [
      { [query.sortBy]: query.sortOrder },
      { id: 'asc' },
    ];
    const [total, customers] = await this.prisma.$transaction([
      this.prisma.customer.count({ where }),
      this.prisma.customer.findMany({
        where,
        skip,
        take: query.limit,
        orderBy,
        select: CUSTOMER_SELECT,
      }),
    ]);

    return {
      data: customers,
      meta: this.pagination(query.page, query.limit, total),
    };
  }

  async create(dto: CreateCustomerDto, user: AuthenticatedUser) {
    const customer = await this.prisma.customer.create({
      data: {
        ...dto,
        gstNumber: dto.gstNumber || null,
        followUpDate: new Date(dto.followUpDate),
        createdById: user.id,
      },
      select: CUSTOMER_SELECT,
    });
    return { data: customer };
  }

  async detail(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      select: {
        ...CUSTOMER_SELECT,
        _count: { select: { followUps: true, challans: true } },
      },
    });
    if (!customer) this.notFound();

    const { _count, ...data } = customer;
    return {
      data: {
        ...data,
        followUpCount: _count.followUps,
        challanCount: _count.challans,
      },
    };
  }

  async update(id: string, dto: UpdateCustomerDto) {
    if (Object.keys(dto).length === 0) {
      throw new ApiException(
        400,
        'VALIDATION_FAILED',
        'At least one field is required.',
      );
    }
    await this.assertExists(id);
    const customer = await this.prisma.customer.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.gstNumber !== undefined
          ? { gstNumber: dto.gstNumber || null }
          : {}),
        ...(dto.followUpDate
          ? { followUpDate: new Date(dto.followUpDate) }
          : {}),
      },
      select: CUSTOMER_SELECT,
    });
    return { data: customer };
  }

  async listFollowUps(id: string, query: ListFollowUpsQueryDto) {
    await this.assertExists(id);
    const where = { customerId: id };
    const [total, followUps] = await this.prisma.$transaction([
      this.prisma.customerFollowUp.count({ where }),
      this.prisma.customerFollowUp.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: [{ createdAt: query.sortOrder }, { id: query.sortOrder }],
        select: {
          id: true,
          note: true,
          nextFollowUpDate: true,
          createdAt: true,
          createdBy: { select: { id: true, name: true } },
        },
      }),
    ]);
    return {
      data: followUps,
      meta: this.pagination(query.page, query.limit, total),
    };
  }

  async addFollowUp(
    id: string,
    dto: CreateFollowUpDto,
    user: AuthenticatedUser,
  ) {
    const result = await this.prisma.$transaction(async (transaction) => {
      const customer = await transaction.customer.findUnique({
        where: { id },
        select: { id: true, followUpDate: true },
      });
      if (!customer) this.notFound();

      const followUp = await transaction.customerFollowUp.create({
        data: {
          customerId: id,
          note: dto.note,
          nextFollowUpDate: dto.nextFollowUpDate
            ? new Date(dto.nextFollowUpDate)
            : null,
          createdById: user.id,
        },
        select: {
          id: true,
          note: true,
          nextFollowUpDate: true,
          createdAt: true,
          createdBy: { select: { id: true, name: true } },
        },
      });
      const followUpDate = dto.nextFollowUpDate
        ? (
            await transaction.customer.update({
              where: { id },
              data: { followUpDate: new Date(dto.nextFollowUpDate) },
              select: { followUpDate: true },
            })
          ).followUpDate
        : customer.followUpDate;

      return { followUp, followUpDate };
    });

    return {
      data: {
        ...result.followUp,
        customerFollowUpDate: result.followUpDate,
      },
    };
  }

  private async assertExists(id: string): Promise<void> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!customer) this.notFound();
  }

  private notFound(): never {
    throw new ApiException(404, 'CUSTOMER_NOT_FOUND', 'Customer not found.');
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
