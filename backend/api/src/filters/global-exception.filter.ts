import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PinoLogger } from 'nestjs-pino';
import * as Sentry from '@sentry/node';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext('GlobalExceptionFilter');
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const requestId = request.id;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error: any = exception;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const response = exception.getResponse();
      message = typeof response === 'string' ? response : (response as any).message;
    }

    // Log the error with context
    this.logger.error({
      exception,
      requestId,
      path: request.url,
      method: request.method,
      statusCode,
      message,
    });

    // Send error to Sentry if it's a server error
    if (statusCode >= 500) {
      Sentry.captureException(exception, {
        extra: {
          requestId,
          path: request.url,
          method: request.method,
        },
      });
    }

    const responseBody = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      requestId,
      path: request.url,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
} 