import { EntregaMaterialService } from './entrega_material.service';
import { EntregaMaterial } from './entities/EntregaMaterial';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('entrega-material')
@UseGuards(PermisosGuard)
export class EntregaMaterialController {
  constructor(private readonly entregaService: EntregaMaterialService) {}

  @Get()
  @RutaProtegida({ ruta: '/entrega-material', accion: 'puede_ver' })
  findAll(): Promise<EntregaMaterial[]> {
    return this.entregaService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/entrega-material', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<EntregaMaterial> {
    return this.entregaService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/entrega-material', accion: 'puede_crear' })
  create(@Body() data: Partial<EntregaMaterial>): Promise<EntregaMaterial> {
    return this.entregaService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/entrega-material', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<EntregaMaterial>): Promise<EntregaMaterial> {
    return this.entregaService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/entrega-material', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.entregaService.remove(+id);
  }
}
