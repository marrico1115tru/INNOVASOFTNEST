import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sitio } from './entities/Sitio.entity';
import { SitioService } from './sitio.service';
import { SitioController } from './sitio.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ Módulo de autenticación para JwtAuthGuard

@Module({
  imports: [
    TypeOrmModule.forFeature([Sitio]),
    forwardRef(() => AuthModule), // ✅ Importación necesaria para usar JwtService si hay guardias
  ],
  controllers: [SitioController],
  providers: [SitioService],
  exports: [SitioService], // ✅ Exportar el servicio si otros módulos lo requieren
})
export class SitioModule {}
