import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoSitio } from './entities/TipoSitio';
import { TipoSitioService } from './tipo_sitio.service';
import { TipoSitioController } from './tipo_sitio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoSitio])],
  controllers: [TipoSitioController],
  providers: [TipoSitioService],
})
export class TipoSitioModule {}
