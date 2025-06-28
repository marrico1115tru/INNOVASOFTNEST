import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';
import { AuthModule } from '../auth/auth.module'; // Importa AuthModule si usas JwtAuthGuard

@Module({
  imports: [
    TypeOrmModule.forFeature([Modulo]),
    forwardRef(() => AuthModule), // Necesario si hay dependencia circular con AuthModule
  ],
  controllers: [ModuloController],
  providers: [ModuloService],
  exports: [ModuloService, TypeOrmModule], // Exporta TypeOrmModule por si otros módulos necesitan la entidad
})
export class ModuloModule {}
