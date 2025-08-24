import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // En desarrollo, busca archivos .ts. En producción, busca archivos .js compilados.
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  
  // En desarrollo, busca archivos .ts. En producción, busca archivos .js compilados.
  migrations: [path.join(__dirname, 'database', 'migrations', '*{.ts,.js}')],
  
  synchronize: false,
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;