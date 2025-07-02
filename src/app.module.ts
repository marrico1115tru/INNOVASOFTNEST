import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos propios
import { MunicipiosModule } from './municipios/municipios.module';
import { CentroFormacionModule } from './centro_formacion/centro_formacion.module';
import { SedesModule } from './sedes/sedes.module';
import { AreasModule } from './areas/areas.module';
import { SitioModule } from './sitio/sitio.module';
import { InventarioModule } from './inventario/inventario.module';
import { ProductosModule } from './productos/productos.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { DetalleSolicitudModule } from './detalle_solicitud/detalle_solicitud.module';
import { CategoriasProductosModule } from './categorias_productos/categorias_productos.module';
import { EntregaMaterialModule } from './entrega_material/entrega_material.module';
import { FichasFormacionModule } from './fichas_formacion/fichas_formacion.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { TipoSitioModule } from './tipo_sitio/tipo_sitio.module';
import { TituladosModule } from './titulados/titulados.module';
import { PermisosModule } from './permisos/permisos.module';
import { ModuloModule } from './modulo/modulo.module';
import { OpcionesModule } from './opciones/opciones.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ✅ Variables de entorno globales
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ Configuración de la conexión a la base de datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: parseInt(config.get<string>('DB_PORT') || '5432'),
        username: config.get<string>('DB_USERNAME') || 'postgres',
        password: config.get<string>('DB_PASSWORD') || '123456',
        database: config.get<string>('DB_NAME') || 'bodegaSena',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    // ✅ Módulos propios
    MunicipiosModule,
    CentroFormacionModule,
    SedesModule,
    AreasModule,
    SitioModule,
    InventarioModule,
    ProductosModule,
    MovimientosModule,
    DetalleSolicitudModule,
    CategoriasProductosModule,
    EntregaMaterialModule,
    FichasFormacionModule,
    SolicitudesModule,
    UsuariosModule,
    RolesModule,
    TipoSitioModule,
    TituladosModule,
    PermisosModule,
    ModuloModule,
    OpcionesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
