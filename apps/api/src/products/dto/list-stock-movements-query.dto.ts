import { Type } from 'class-transformer';
import { StockMovementType, StockReferenceType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import {
  MOVEMENT_DEFAULT_PAGE_SIZE,
  MOVEMENT_MAX_PAGE_SIZE,
} from '../products.constants';

export class ListStockMovementsQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MOVEMENT_MAX_PAGE_SIZE)
  limit = MOVEMENT_DEFAULT_PAGE_SIZE;

  @IsOptional()
  @IsUUID('4')
  productId?: string;

  @IsOptional()
  @IsEnum(StockMovementType)
  movementType?: StockMovementType;

  @IsOptional()
  @IsEnum(StockReferenceType)
  referenceType?: StockReferenceType;

  @IsOptional()
  @IsUUID('4')
  createdById?: string;

  @IsOptional()
  @IsUUID('4')
  challanId?: string;

  @IsOptional()
  @IsDateString({ strict: true })
  from?: string;

  @IsOptional()
  @IsDateString({ strict: true })
  to?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}
