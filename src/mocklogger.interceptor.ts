import { CustomLoggerInterceptor } from './logger.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

export class MockLoggerInterceptor extends CustomLoggerInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(
      'MockLoggerInterceptor: ',
      context.switchToHttp().getRequest<Request>().method,
      context.switchToHttp().getRequest<Request>().path,
    );
    return next.handle();
  }
}
