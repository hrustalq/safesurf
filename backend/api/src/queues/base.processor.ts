import { OnQueueActive, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { PinoLogger } from 'nestjs-pino';

export abstract class BaseQueueProcessor {
  protected constructor(
    protected readonly logger: PinoLogger,
    private readonly queueName: string,
  ) {
    this.logger.setContext(queueName);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.info(
      { jobId: job.id, data: job.data },
      `Processing job ${job.id} of type ${job.name}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.info(
      { jobId: job.id, result },
      `Completed job ${job.id} of type ${job.name}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job, error: any) {
    this.logger.error(
      { jobId: job.id, error },
      `Failed job ${job.id} of type ${job.name}`,
    );
  }
} 