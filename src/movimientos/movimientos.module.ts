import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimientos } from './entities/Movimientos';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movimientos])],
  controllers: [MovimientosController],
  providers: [MovimientosService],
})
export class MovimientosModule {}
