import { Transform, Type } from 'class-transformer';
import { CustomerStatus, CustomerType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  CUSTOMER_DEFAULT_PAGE_SIZE,
  CUSTOMER_MAX_PAGE_SIZE,
} from '../customers.constants';

export class ListCustomersQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(CUSTOMER_MAX_PAGE_SIZE)
  limit = CUSTOMER_DEFAULT_PAGE_SIZE;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsEnum(CustomerStatus)
  status?: CustomerStatus;

  @IsOptional()
  @IsEnum(CustomerType)
  customerType?: CustomerType;

  @IsOptional()
  @IsDateString({ strict: true })
  followUpFrom?: string;

  @IsOptional()
  @IsDateString({ strict: true })
  followUpTo?: string;

  @IsOptional()
  @IsIn([
    'name',
    'businessName',
    'status',
    'followUpDate',
    'createdAt',
    'updatedAt',
  ])
  sortBy:
    | 'name'
    | 'businessName'
    | 'status'
    | 'followUpDate'
    | 'createdAt'
    | 'updatedAt' = 'followUpDate';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'asc';
}
