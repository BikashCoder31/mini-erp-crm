import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class CreateFollowUpDto {
  @ApiProperty({ minLength: 1, maxLength: 2000 })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(1, 2000)
  note!: string;

  @ApiPropertyOptional({ example: '2026-08-03T00:00:00.000Z' })
  @IsOptional()
  @IsDateString({ strict: true })
  nextFollowUpDate?: string;
}
