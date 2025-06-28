import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sedes } from './entities/Sedes';
import { SedesService } from './sedes.service';
import { SedesController } from './sedes.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ Importar el módulo de autenticación

@Module({
  imports: [
    TypeOrmModule.forFeature([Sedes]),
    forwardRef(() => AuthModule), // ✅ Necesario si hay protección con JwtAuthGuard
  ],
  controllers: [SedesController],
  providers: [SedesService],
  exports: [SedesService], // ✅ Exportar si otros módulos necesitan usar el servicio
})
export class SedesModule {}
