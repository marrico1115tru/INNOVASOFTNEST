import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionesService } from './opciones.service';
import { OpcionesController } from './opciones.controller';
import { Opcion } from './entities/opcion';
import { Modulo } from './../modulo/entities/modulo';

@Module({
  imports: [TypeOrmModule.forFeature([Opcion, Modulo])],
  controllers: [OpcionesController],
  providers: [OpcionesService],
  exports: [OpcionesService],
})
export class OpcionesModule {}
