// En src/usuarios/usuarios.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Areas } from '../areas/entities/Areas.entity';
import { FichasFormacion } from '../fichas_formacion/entities/FichasFormacion.entity';
import { Rol } from '../roles/entities/rol.entity';
import { AuthModule } from '../auth/auth.module';
import { PermisosModule } from '../permisos/permisos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios, Areas, FichasFormacion, Rol]),
    forwardRef(() => AuthModule),
    forwardRef(() => PermisosModule),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  // --- ¡LA CORRECCIÓN FINAL! ---
  // Ahora exportas tanto el servicio como el acceso a la base de datos para esas entidades.
  exports: [UsuariosService, TypeOrmModule],
})
export class UsuariosModule {}