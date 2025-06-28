import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { Permiso } from './entities/permiso';
import { Rol } from '../roles/entities/rol';
import { Opcion } from '../opciones/entities/opcion';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permiso, Rol, Opcion]),
    forwardRef(() => AuthModule), // Solo si tienes dependencias circulares
  ],
  controllers: [PermisosController],
  providers: [PermisosService],
  exports: [
    PermisosService,           // 👈 Exportar el servicio
    TypeOrmModule              // 👈 Exportar repositorio si lo usas fuera
  ],
})
export class PermisosModule {}
