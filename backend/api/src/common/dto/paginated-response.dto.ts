import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ApiResponseDto } from './api-response.dto';

export class PaginationMeta {
  @ApiProperty()
  @Expose()
  total: number;

  @ApiProperty()
  @Expose()
  page: number;

  @ApiProperty()
  @Expose()
  limit: number;

  @ApiProperty()
  @Expose()
  totalPages: number;

  @ApiProperty()
  @Expose()
  hasNextPage: boolean;

  @ApiProperty()
  @Expose()
  hasPreviousPage: boolean;
}

export class PaginatedResponseDto<T> extends ApiResponseDto<T[]> {
  @ApiProperty()
  @Expose()
  @Type(() => PaginationMeta)
  meta: PaginationMeta;
} 