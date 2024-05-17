import { DataSource, DataSourceOptions } from 'typeorm';

export const safeInit = (dataSource: DataSource) =>
  !dataSource.isInitialized ? dataSource.initialize() : dataSource;

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/sql.db',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  //   password: '',
  //   autoLoadEntities: true,
  // entities: [User],
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
