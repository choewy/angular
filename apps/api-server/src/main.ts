import { Bootstrap } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
  const app = await Bootstrap.bindApp(await NestFactory.create(RootModule));

  const swaggerBuilder = new DocumentBuilder()
    .setVersion('1.0.0')
    .setTitle('SWAGGER - API SERVER')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'bearer',
    })
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerBuilder);

  SwaggerModule.setup('swagger', app, swaggerDocument, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(4000, '::');
})();
