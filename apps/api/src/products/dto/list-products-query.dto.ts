import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  PRODUCT_DEFAULT_PAGE_SIZE,
  PRODUCT_MAX_PAGE_SIZE,
} from '../products.constants';

const optionalBoolean = ({ value }: { value: unknown }) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
};

export class ListProductsQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(PRODUCT_MAX_PAGE_SIZE)
  limit = PRODUCT_DEFAULT_PAGE_SIZE;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  warehouseLocation?: string;

  @Transform(optionalBoolean)
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Transform(optionalBoolean)
  @IsOptional()
  @IsBoolean()
  lowStock?: boolean;

  @IsOptional()
  @IsIn(['name', 'sku', 'unitPrice', 'currentStock', 'createdAt', 'updatedAt'])
  sortBy:
    | 'name'
    | 'sku'
    | 'unitPrice'
    | 'currentStock'
    | 'createdAt'
    | 'updatedAt' = 'updatedAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}
