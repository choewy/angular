import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { createOkMessage } from '../helpers';

export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest<Request>();
    request['context'] = ctx.getClass().name || 'Unhandled';

    return next.handle().pipe(
      tap(() => {
        const request = ctx.switchToHttp().getRequest<Request>();
        const message = createOkMessage(request);
        this.logger.verbose(message, request['context']);
      }),
    );
  }
}
