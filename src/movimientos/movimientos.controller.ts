import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { MovimientosService } from './../movimientos/movimientos.service';
import { Movimientos } from './entities/Movimientos';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Get()
  findAll(): Promise<Movimientos[]> {
    return this.movimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movimientos> {
    return this.movimientosService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Movimientos>): Promise<Movimientos> {
    return this.movimientosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Movimientos>): Promise<Movimientos> {
    return this.movimientosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.movimientosService.remove(+id);
  }
}
