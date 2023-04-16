import { DataSource, DataSourceOptions } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: 'medium.db',
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}']
} as DataSourceOptions);