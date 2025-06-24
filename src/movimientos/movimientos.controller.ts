import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { MovimientosService } from './../movimientos/movimientos.service';
import { Movimientos } from './entities/Movimientos';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('movimientos')
@UseGuards(PermisosGuard)
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Get()
  @RutaProtegida({ ruta: '/movimientos', accion: 'puede_ver' })
  findAll(): Promise<Movimientos[]> {
    return this.movimientosService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/movimientos', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Movimientos> {
    return this.movimientosService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/movimientos', accion: 'puede_crear' })
  create(@Body() data: Partial<Movimientos>): Promise<Movimientos> {
    return this.movimientosService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/movimientos', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Movimientos>): Promise<Movimientos> {
    return this.movimientosService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/movimientos', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.movimientosService.remove(+id);
  }
}
