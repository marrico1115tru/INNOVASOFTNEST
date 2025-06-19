import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sitio } from './entities/Sitio';
import { SitioService } from './sitio.service';
import { SitioController } from './sitio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sitio])],
  controllers: [SitioController],
  providers: [SitioService],
})
export class SitioModule {}
