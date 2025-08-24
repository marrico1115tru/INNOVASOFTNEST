import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitudes } from './entities/Solicitudes.entity';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { AuthModule } from '../auth/auth.module'; // Para proteger con JwtAuthGuard y usar @User()

@Module({
  imports: [
    TypeOrmModule.forFeature([Solicitudes]),
    forwardRef(() => AuthModule), // Para evitar problemas de dependencias circulares
  ],
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
  exports: [SolicitudesService, TypeOrmModule],
})
export class SolicitudesModule {}
