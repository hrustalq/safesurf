import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class NotificationService {
  private readonly emailTransporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext('NotificationService');
    
    // Initialize email transporter
    this.emailTransporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      await this.emailTransporter.sendMail({
        from: this.configService.get('SMTP_FROM'),
        to,
        subject,
        html,
      });
      this.logger.info({ to, subject }, 'Email sent successfully');
    } catch (error) {
      this.logger.error({ error, to, subject }, 'Failed to send email');
      throw error;
    }
  }
} 