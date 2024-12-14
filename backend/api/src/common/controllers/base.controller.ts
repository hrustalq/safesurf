import { ApiResponse } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';
import { Type } from '@nestjs/common';

export class BaseController {
  protected static apiResponse<T>(type: Type<T>) {
    return ApiResponse({
      type: ApiResponseDto<T>,
    });
  }

  protected static apiPaginatedResponse<T>(type: Type<T>) {
    return ApiResponse({
      type: ApiResponseDto<T[]>,
    });
  }
} 