import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ApiResponseDto<T> {
  @ApiProperty()
  @Expose()
  success: boolean;

  @ApiProperty()
  @Expose()
  message: string;

  @ApiProperty()
  @Expose()
  @Type((options) => {
    return (options?.newObject as any)?.type;
  })
  data?: T;

  @ApiProperty()
  @Expose()
  timestamp: string;

  @ApiProperty()
  @Expose()
  path: string;

  constructor(partial: Partial<ApiResponseDto<T>>) {
    Object.assign(this, partial);
    this.timestamp = new Date().toISOString();
  }
} 