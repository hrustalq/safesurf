import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';
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

    // Initialize Firebase Admin for push notifications
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.configService.get('FIREBASE_PRIVATE_KEY'),
        }),
      });
    }
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

  async sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>) {
    try {
      await admin.messaging().send({
        token,
        notification: {
          title,
          body,
        },
        data,
      });
      this.logger.info({ token, title }, 'Push notification sent successfully');
    } catch (error) {
      this.logger.error({ error, token, title }, 'Failed to send push notification');
      throw error;
    }
  }
} 