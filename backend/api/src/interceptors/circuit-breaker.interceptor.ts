import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as CircuitBreaker from 'opossum';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private breaker: CircuitBreaker;

  constructor() {
    this.breaker = new CircuitBreaker(async (fn: Function) => await fn(), {
      timeout: 3000, // Time in milliseconds to trigger the circuit
      errorThresholdPercentage: 50, // Error percentage at which to open the circuit
      resetTimeout: 30000, // Time in milliseconds to reset the circuit
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return new Observable(subscriber => {
      this.breaker.fire(() => next.handle().toPromise())
        .then(result => {
          subscriber.next(result);
          subscriber.complete();
        })
        .catch(err => subscriber.error(err));
    });
  }
} 