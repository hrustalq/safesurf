import { Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  constructor(@Inject(REQUEST) private request: Request) {}

  get requestId(): string {
    return this.request.id.toString();
  }

  get path(): string {
    return this.request.path;
  }

  get method(): string {
    return this.request.method;
  }

  get user(): any {
    return this.request.user;
  }

  get version(): string {
    const version = this.request.headers['accept-version'];
    return Array.isArray(version) ? version[0] : version || '1';
  }

  get language(): string {
    const lang = this.request.headers['accept-language'];
    return Array.isArray(lang) ? lang[0] : lang || 'en';
  }
} 