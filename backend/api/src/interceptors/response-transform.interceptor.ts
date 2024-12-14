import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { RequestContextService } from '../common/services/request-context.service';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  constructor(private readonly requestContext: RequestContextService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T>> {
    return next.handle().pipe(
      map(data => {
        const response = new ApiResponseDto<T>({
          success: true,
          message: 'Operation successful',
          data,
          path: this.requestContext.path,
        });

        // Handle pagination metadata if present
        if (data?.meta) {
          Object.assign(response, { meta: data.meta });
          response.data = data.data;
        }

        return response;
      }),
    );
  }
} 