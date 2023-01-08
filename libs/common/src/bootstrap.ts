import { INestApplication, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { HttpFilter } from './filters';
import { ErrorFilter } from './filters/error.filter';
import { HttpInterceptor, SerializerInterceptor } from './interceptors';
import { ValidationPipe } from './pipes';

export class Bootstrap {
  public static async bindApp(app: INestApplication) {
    app.use(json());
    app.use(urlencoded({ extended: true }));

    const logger = app.get(Logger);

    app.useGlobalInterceptors(new SerializerInterceptor(app.get(Reflector)), new HttpInterceptor(logger));
    app.useGlobalFilters(new ErrorFilter(logger), new HttpFilter(logger));
    app.useGlobalPipes(new ValidationPipe());

    return app;
  }
}
