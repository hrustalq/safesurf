import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PinoLogger } from 'nestjs-pino';
import { performance } from 'perf_hooks';

const createPrismaExtension = (logger: PinoLogger) => {
  return Prisma.defineExtension({
    name: 'prismaExtension',
    query: {
      async $allOperations({ operation, model, args, query }) {
        const start = performance.now();
        
        try {
          const result = await query(args);
          
          const end = performance.now();
          const duration = end - start;
          
          logger.debug({
            model,
            operation,
            duration: `${duration.toFixed(3)}ms`,
            args
          });

          return result;
        } catch (error) {
          logger.error({
            model,
            operation,
            args,
            error
          });
          throw error;
        }
      }
    }
  });
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly logger: PinoLogger) {
    super();
    this.logger.setContext('PrismaService');
    
    // Add middleware for logging
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

    // Apply the extension
    (this as any).$extends(createPrismaExtension(this.logger));
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
} 