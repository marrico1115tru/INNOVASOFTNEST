import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleSolicitud } from './entities/DetalleSolicitud';
import { DetalleSolicitudService } from './detalle_solicitud.service';
import { DetalleSolicitudController } from './detalle_solicitud.controller';
import { AuthModule } from '../auth/auth.module'; // Importa AuthModule para usar JwtAuthGuard

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleSolicitud]),
    forwardRef(() => AuthModule), // Para habilitar JwtAuthGuard con acceso circular
  ],
  controllers: [DetalleSolicitudController],
  providers: [DetalleSolicitudService],
  exports: [DetalleSolicitudService, TypeOrmModule],
})
export class DetalleSolicitudModule {}
