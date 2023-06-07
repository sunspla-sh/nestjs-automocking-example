import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class CustomLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(
      'CustomLoggerInterceptor: ',
      context.switchToHttp().getRequest<Request>().method,
      context.switchToHttp().getRequest<Request>().path,
    );
    return next.handle();
  }
}
