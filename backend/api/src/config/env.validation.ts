import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsOptional, IsUrl, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  // Application
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  API_VERSION: string;

  @IsString()
  @IsOptional()
  API_DOCS_PATH: string;

  // CORS
  @IsString()
  @IsOptional()
  ALLOWED_ORIGINS: string;

  // Rate Limiting
  @IsNumber()
  @IsOptional()
  THROTTLE_TTL: number;

  @IsNumber()
  @IsOptional()
  THROTTLE_LIMIT: number;

  // Logging
  @IsString()
  @IsOptional()
  LOG_LEVEL: string;

  // Error Reporting
  @IsUrl()
  @IsOptional()
  SENTRY_DSN: string;

  // Email
  @IsString()
  SMTP_HOST: string;

  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  SMTP_USER: string;

  @IsString()
  SMTP_PASS: string;

  @IsString()
  SMTP_FROM: string;

  // Firebase
  @IsString()
  FIREBASE_PROJECT_ID: string;

  @IsString()
  FIREBASE_CLIENT_EMAIL: string;

  @IsString()
  FIREBASE_PRIVATE_KEY: string;

  // Database
  @IsString()
  DATABASE_URL: string;

  // JWT
  @IsString()
  JWT_SECRET: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRATION: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsOptional()
  JWT_REFRESH_EXPIRATION: string;

  // Cache
  @IsString()
  @IsOptional()
  REDIS_HOST: string;

  @IsNumber()
  @IsOptional()
  REDIS_PORT: number;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string;

  // Health Check
  @IsString()
  @IsOptional()
  HEALTH_CHECK_TOKEN: string;

  // Frontend URLs
  @IsString()
  @IsOptional()
  ADMIN_URL: string;

  @IsString()
  @IsOptional()
  WEB_URL: string;

  // API Keys
  @IsString()
  @IsOptional()
  API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
} 