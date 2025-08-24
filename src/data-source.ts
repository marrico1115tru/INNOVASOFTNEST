// src/data-source.ts

import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path'; // Se importa la librería 'path' para crear rutas robustas.

// Cargar las variables de entorno desde el archivo .env
config(); 

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // --- VALIDADO Y CORRECTO ---
  // Esta ruta busca en 'src' (porque __dirname apunta a 'src') y en todas
  // sus subcarpetas ('**') cualquier archivo que termine en '.entity.ts' o '.entity.js'.
  // Como ya renombraste todos tus archivos de entidad, esto los encontrará.
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  
  // --- VALIDADO Y CORRECTO ---
  // Esta ruta busca en 'src/database/migrations'. Como confirmaste que
  // tu carpeta 'database' está dentro de 'src', esta ruta es correcta.
  migrations: [path.join(__dirname, 'database', 'migrations', '*.{ts,js}')],
  
  synchronize: false, // Correcto.
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;