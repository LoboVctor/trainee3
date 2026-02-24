import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'database.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
