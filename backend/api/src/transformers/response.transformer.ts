import { Exclude, Expose } from 'class-transformer';

export class BaseResponseDto {
  @Expose()
  statusCode: number;

  @Expose()
  message: string;

  @Expose()
  timestamp: string;

  @Expose()
  requestId: string;

  @Exclude()
  error?: string;

  constructor(partial: Partial<BaseResponseDto>) {
    Object.assign(this, partial);
    this.timestamp = new Date().toISOString();
  }
}

export class PaginatedResponseDto<T> extends BaseResponseDto {
  @Expose()
  data: T[];

  @Expose()
  meta: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
} 