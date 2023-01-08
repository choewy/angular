import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { DateTime } from 'luxon';
import { User, Account } from './entities';

export const schemaConfig = registerAs(
  'typeorm',
  (): TypeOrmModuleOptions => ({
    type: process.env.TYPE as any,
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [User, Account],
    migrations: [process.cwd() + process.env.MIGRATIONS],
    synchronize: process.env.SYNCHRONIZE === 'true',
    logging: process.env.LOGGING === 'true',
    timezone: process.env.TIMEZONE,
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    extra: {
      typeCast: (field, next) => {
        const { type } = field;

        if (type === 'DATE') {
          const val = field.string();

          return val === null ? null : DateTime.fromFormat(val, 'yyyy-MM-dd');
        } else if (type === 'DATETIME') {
          const val = field.string();

          return val === null ? null : DateTime.fromFormat(val, 'yyyy-MM-dd HH:mm:ss');
        } else {
          return next();
        }
      },
    },
  }),
);
