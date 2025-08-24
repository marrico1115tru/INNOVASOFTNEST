import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

// ✅ PASO 1: Importa la configuración del archivo data-source
import { dataSourceOptions } from './data-source';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos propios (estos no cambian)
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
import { DiegoModule } from './diego/diego.module';

@Module({
  imports: [
    // Variables de entorno globales
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ PASO 2: Utiliza la configuración importada. Es más simple y directo.
    // La opción 'synchronize: false' ahora está definida en 'dataSourceOptions'.
    TypeOrmModule.forRoot(dataSourceOptions),

    // La configuración del MailerModule permanece igual, ya que no afecta a la base de datos.
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST') || 'smtp.gmail.com',
          port: parseInt(config.get<string>('MAIL_PORT') || '587'),
          auth: {
            user: config.get<string>('MAIL_USER') || 'tucorreo@gmail.com',
            pass: config.get<string>('MAIL_PASS') || 'tu_app_password',
          },
        },
        defaults: {
          from: '"Soporte SENA" <no-responder@sena.edu.co>',
        },
      }),
    }),

    // Tus módulos propios no necesitan cambios
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
    DiegoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}