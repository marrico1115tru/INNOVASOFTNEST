import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroFormacion } from './entities/CentroFormacion.entity';
import { CentroFormacionService } from './centro_formacion.service';
import { CentroFormacionController } from './centro_formacion.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CentroFormacion]),
    forwardRef(() => AuthModule), // ✅ Necesario si hay protección con JwtAuthGuard
  ],
  controllers: [CentroFormacionController],
  providers: [CentroFormacionService],
  exports: [CentroFormacionService], // ✅ Exporta si otros módulos lo necesitan
})
export class CentroFormacionModule {}
