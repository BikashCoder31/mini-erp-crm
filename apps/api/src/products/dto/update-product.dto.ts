import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const upper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class UpdateProductDto {
  @ApiPropertyOptional({ minLength: 2, maxLength: 180 })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @Length(2, 180)
  name?: string;

  @ApiPropertyOptional({ minLength: 2, maxLength: 64 })
  @Transform(upper)
  @IsOptional()
  @IsString()
  @Length(2, 64)
  @Matches(/^[A-Z0-9][A-Z0-9._/-]*$/)
  sku?: string;

  @ApiPropertyOptional({ minLength: 2, maxLength: 120 })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @Length(2, 120)
  category?: string;

  @ApiPropertyOptional({ example: '1250.00' })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,10}(\.\d{1,2})?$/)
  unitPrice?: string;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  minimumStockAlertQuantity?: number;

  @ApiPropertyOptional({ minLength: 2, maxLength: 160 })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @Length(2, 160)
  warehouseLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  currentStock?: unknown;
}
