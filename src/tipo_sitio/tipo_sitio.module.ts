import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoSitio } from './entities/TipoSitio';
import { TipoSitioService } from './tipo_sitio.service';
import { TipoSitioController } from './tipo_sitio.controller';
import { AuthModule } from '../auth/auth.module'; // Si usas autenticación con JWT

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoSitio]),
    forwardRef(() => AuthModule), // Para usar JwtAuthGuard si lo necesitas
  ],
  controllers: [TipoSitioController],
  providers: [TipoSitioService],
  exports: [TipoSitioService, TypeOrmModule],
})
export class TipoSitioModule {}
