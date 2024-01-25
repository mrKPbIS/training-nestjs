import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseType } from 'src/bar/decorators/response.decorator';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const responseType = this.reflector.get(
          ResponseType,
          context.getHandler(),
        );
        if (!responseType) {
          return { data };
        } else {
          return {
            data: plainToInstance(responseType, data, {
              excludeExtraneousValues: true,
            }),
          };
        }
      }),
    );
  }
}
