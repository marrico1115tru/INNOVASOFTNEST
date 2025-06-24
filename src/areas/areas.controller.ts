import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { AreasService } from './areas.service';
import { Areas } from './entities/Areas';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';

@Controller('areas')
@UseGuards(PermisosGuard)
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  @RutaProtegida({ ruta: '/areas', accion: 'puede_ver' })
  findAll(): Promise<Areas[]> {
    return this.areasService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/areas', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Areas> {
    return this.areasService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/areas', accion: 'puede_crear' })
  create(@Body() data: Partial<Areas>): Promise<Areas> {
    return this.areasService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/areas', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Areas>): Promise<Areas> {
    return this.areasService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/areas', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.areasService.remove(+id);
  }
}