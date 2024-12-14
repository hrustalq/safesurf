import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    bufferLogs: true,
  });

  // Get Config Service
  const configService = app.get(ConfigService);

  // CORS configuration
  app.enableCors({
    origin: [
      ...configService.get('ALLOWED_ORIGINS', []).split(','),
      configService.get('ADMIN_URL', 'https://admin.safesurf.local'),
      configService.get('WEB_URL', 'https://safesurf.local'),
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-API-KEY', 'Accept-Version'],
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
  });

  // Logger
  app.useLogger(app.get(Logger));

  // Global Middleware
  app.use(helmet());
  app.use(compression());

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // Global Interceptors
  app.useGlobalInterceptors(new TimeoutInterceptor());

  // API Versioning
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-Version',
    defaultVersion: '1',
  });

  // Setup Swagger documentation
  setupSwagger(app);

  // Graceful Shutdown
  app.enableShutdownHooks();

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();
