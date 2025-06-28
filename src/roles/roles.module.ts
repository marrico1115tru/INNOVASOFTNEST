import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Rol } from './entities/rol';
import { AuthModule } from '../auth/auth.module'; // Importa el módulo de autenticación

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol]),
    forwardRef(() => AuthModule), // Previene errores de dependencia circular
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, TypeOrmModule], // Exporta también TypeOrmModule si es requerido
})
export class RolesModule {}
