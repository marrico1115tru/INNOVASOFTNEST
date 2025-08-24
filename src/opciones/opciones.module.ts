import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionesService } from './opciones.service';
import { OpcionesController } from './opciones.controller';
import { Opcion } from './entities/opcion.entity';
import { Modulo } from '../modulo/entities/modulo.entity';
import { AuthModule } from '../auth/auth.module'; // Importa AuthModule para habilitar JwtAuthGuard

@Module({
  imports: [
    TypeOrmModule.forFeature([Opcion, Modulo]),
    forwardRef(() => AuthModule), // Usado si AuthModule importa también OpcionesModule o similares
  ],
  controllers: [OpcionesController],
  providers: [OpcionesService],
  exports: [OpcionesService, TypeOrmModule], // Exporta TypeOrmModule por si se necesita en otros módulos
})
export class OpcionesModule {}
