import { SchemaModule } from '@app/schema';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommonController } from './common.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.cwd() + '/documentation',
    }),
    SchemaModule,
  ],
  controllers: [CommonController],
})
export class CommonModule {}
