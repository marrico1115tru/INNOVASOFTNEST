import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimientos } from './entities/Movimientos';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { Inventario } from '../inventario/entities/Inventario';
import { InventarioModule } from '../inventario/inventario.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimientos, Inventario]),
    InventarioModule,
  ],
  controllers: [MovimientosController],
  providers: [MovimientosService],
})
export class MovimientosModule {}
