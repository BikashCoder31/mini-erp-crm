import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  CUSTOMER_DEFAULT_PAGE_SIZE,
  CUSTOMER_MAX_PAGE_SIZE,
} from '../customers.constants';

export class ListFollowUpsQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(CUSTOMER_MAX_PAGE_SIZE)
  limit = CUSTOMER_DEFAULT_PAGE_SIZE;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}
