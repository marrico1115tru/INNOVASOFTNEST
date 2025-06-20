import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: '123456', 
      database: 'bodegaSena', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, 
    }),

    
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
