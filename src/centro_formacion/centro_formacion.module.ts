import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroFormacion } from './entities/CentroFormacion';
import { CentroFormacionService } from './centro_formacion.service';
import { CentroFormacionController } from './centro_formacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CentroFormacion])],
  controllers: [CentroFormacionController],
  providers: [CentroFormacionService],
})
export class CentroFormacionModule {}
