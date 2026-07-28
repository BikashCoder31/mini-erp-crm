import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const upper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class CreateProductDto {
  @ApiProperty({ minLength: 2, maxLength: 180 })
  @Transform(trim)
  @IsString()
  @Length(2, 180)
  name!: string;

  @ApiProperty({ example: 'ADH-005L', minLength: 2, maxLength: 64 })
  @Transform(upper)
  @IsString()
  @Length(2, 64)
  @Matches(/^[A-Z0-9][A-Z0-9._/-]*$/, {
    message:
      'sku may contain uppercase letters, numbers, dots, underscores, slashes, and hyphens',
  })
  sku!: string;

  @ApiProperty({ minLength: 2, maxLength: 120 })
  @Transform(trim)
  @IsString()
  @Length(2, 120)
  category!: string;

  @ApiProperty({ example: '1250.00' })
  @Transform(trim)
  @IsString()
  @Matches(/^\d{1,10}(\.\d{1,2})?$/, {
    message:
      'unitPrice must have at most 10 integer digits and 2 decimal places',
  })
  unitPrice!: string;

  @ApiPropertyOptional({ default: 0, minimum: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  openingStock = 0;

  @ApiProperty({ minimum: 0 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(2_147_483_647)
  minimumStockAlertQuantity!: number;

  @ApiProperty({ minLength: 2, maxLength: 160 })
  @Transform(trim)
  @IsString()
  @Length(2, 160)
  warehouseLocation!: string;
}
