import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Titulados } from './entities/Titulados';
import { TituladosService } from './titulados.service';
import { TituladosController } from './titulados.controller';
import { AuthModule } from '../auth/auth.module'; // Opcional, si usas JwtAuthGuard

@Module({
  imports: [
    TypeOrmModule.forFeature([Titulados]),
    forwardRef(() => AuthModule), // Necesario si usas autenticación con JWT
  ],
  controllers: [TituladosController],
  providers: [TituladosService],
  exports: [TituladosService, TypeOrmModule],
})
export class TituladosModule {}
