import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { schemaConfig } from './schema.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.typeorm.${process.env.NODE_ENV}`],
      load: [schemaConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return configService.get<TypeOrmModuleOptions>('typeorm');
      },
    }),
  ],
})
export class SchemaModule {}
