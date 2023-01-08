import { Bootstrap } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';

(async () => {
  const app = await Bootstrap.bindApp(await NestFactory.create(RootModule));
  await app.listen(4000, '::');
})();
