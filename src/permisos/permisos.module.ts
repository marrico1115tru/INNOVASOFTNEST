import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { Permiso } from './entities/permiso';
import { Rol } from './../roles/entities/rol';
import { Opcion } from './../opciones/entities/opcion';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso, Rol, Opcion])],
  controllers: [PermisosController],
  providers: [PermisosService],
  exports: [PermisosService],
})
export class PermisosModule {}
