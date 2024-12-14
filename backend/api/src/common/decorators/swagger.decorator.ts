import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

export const ApiEndpoint = (summary: string, description?: string) => {
  return applyDecorators(
    ApiOperation({
      summary,
      description,
    }),
  );
};

export const ApiResponse200 = <TModel extends Type<any>>(
  model: TModel,
  isArray = false,
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto, model),
    ApiResponse({
      status: 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  }
                : {
                    $ref: getSchemaPath(model),
                  },
            },
          },
        ],
      },
    }),
  );
};

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(PaginatedResponseDto, model),
    ApiResponse({
      status: 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiErrorResponses = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation failed',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              errors: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          },
        ],
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Authentication failed',
      schema: {
        $ref: getSchemaPath(ApiResponseDto),
      },
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
      schema: {
        $ref: getSchemaPath(ApiResponseDto),
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found - Resource not found',
      schema: {
        $ref: getSchemaPath(ApiResponseDto),
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      schema: {
        $ref: getSchemaPath(ApiResponseDto),
      },
    }),
  );
}; 