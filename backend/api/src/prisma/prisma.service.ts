import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PinoLogger } from 'nestjs-pino';
import { performance } from 'perf_hooks';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: PinoLogger) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
    this.logger.setContext('PrismaService');
  }

  async onModuleInit() {
    await this.$connect();

    // Logging middleware
    this.$use(async (params, next) => {
      const start = performance.now();
      const result = await next(params);
      const end = performance.now();
      const duration = end - start;

      this.logger.debug({
        model: params.model,
        action: params.action,
        duration: `${duration.toFixed(3)}ms`,
        args: params.args,
      });

      return result;
    });

    // Query logging
    this.$on('query', (e: any) => {
      this.logger.debug({
        query: e.query,
        params: e.params,
        duration: `${e.duration}ms`,
      });
    });

    // Error logging
    this.$on('error', (e: any) => {
      this.logger.error(e);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
} 