import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleSolicitud } from './entities/DetalleSolicitud';
import { DetalleSolicitudService } from './detalle_solicitud.service';
import { DetalleSolicitudController } from './detalle_solicitud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleSolicitud])],
  controllers: [DetalleSolicitudController],
  providers: [DetalleSolicitudService],
})
export class DetalleSolicitudModule {}
