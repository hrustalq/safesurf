import { Module, Global } from '@nestjs/common';
import { RequestContextService } from './services/request-context.service';
import { EmailModule } from '../email/email.module';

@Global()
@Module({
  imports: [EmailModule],
  providers: [
    RequestContextService,
  ],
  exports: [
    RequestContextService,
    EmailModule,
  ],
})
export class CommonModule {} 