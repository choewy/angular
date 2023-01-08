import { INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SerializerInterceptor } from './interceptors';

export class Bootstrap {
  public static async bindApp(app: INestApplication) {
    app.useGlobalInterceptors(new SerializerInterceptor(app.get(Reflector)));

    return app;
  }
}
