import { InventarioService } from './inventario.service';
import { Inventario } from './entities/Inventario';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('inventario')
@UseGuards(PermisosGuard)
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  @RutaProtegida({ ruta: '/inventario', accion: 'puede_ver' })
  findAll(): Promise<Inventario[]> {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/inventario', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Inventario> {
    return this.inventarioService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/inventario', accion: 'puede_crear' })
  create(@Body() data: Partial<Inventario>): Promise<Inventario> {
    return this.inventarioService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/inventario', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Inventario>): Promise<Inventario> {
    return this.inventarioService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/inventario', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.inventarioService.remove(+id);
  }

  @Put(':id/mover-stock')
  @RutaProtegida({ ruta: '/inventario', accion: 'puede_editar' })
  moverStock(@Param('id') id: string, @Body() data: UpdateStockDto): Promise<Inventario> {
    return this.inventarioService.moverStock(+id, data);
  }
}
