import { NestFactory } from '@nestjs/core';
import { WsServerModule } from './ws-server.module';

async function bootstrap() {
  const app = await NestFactory.create(WsServerModule);
  await app.listen(3000);
}
bootstrap();
