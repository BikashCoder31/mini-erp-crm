import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CustomerStatus, CustomerType } from '@prisma/client';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const lower = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;
const upper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class CreateCustomerDto {
  @ApiProperty({ minLength: 2, maxLength: 160 })
  @Transform(trim)
  @IsString()
  @Length(2, 160)
  name!: string;

  @ApiProperty({ example: '+977 981-234-5678', minLength: 7, maxLength: 24 })
  @Transform(trim)
  @IsString()
  @Length(7, 24)
  @Matches(/^[\d\s+()-]+$/, {
    message: 'mobileNumber contains unsupported characters',
  })
  mobileNumber!: string;

  @ApiProperty({ example: 'contact@example.com', maxLength: 254 })
  @Transform(lower)
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiProperty({ minLength: 2, maxLength: 180 })
  @Transform(trim)
  @IsString()
  @Length(2, 180)
  businessName!: string;

  @ApiPropertyOptional({ maxLength: 32 })
  @Transform(upper)
  @IsOptional()
  @IsString()
  @MaxLength(32)
  gstNumber?: string;

  @ApiProperty({ enum: CustomerType })
  @IsEnum(CustomerType)
  customerType!: CustomerType;

  @ApiProperty({ minLength: 5, maxLength: 1000 })
  @Transform(trim)
  @IsString()
  @Length(5, 1000)
  address!: string;

  @ApiProperty({ enum: CustomerStatus })
  @IsEnum(CustomerStatus)
  status!: CustomerStatus;

  @ApiProperty({ example: '2026-07-31T00:00:00.000Z' })
  @IsDateString({ strict: true })
  followUpDate!: string;

  @ApiProperty({ minLength: 1, maxLength: 4000 })
  @Transform(trim)
  @IsString()
  @Length(1, 4000)
  notes!: string;
}
