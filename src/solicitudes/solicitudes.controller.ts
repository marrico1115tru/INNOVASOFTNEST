import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { Solicitudes } from './entities/Solicitudes';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('solicitudes')
@UseGuards(PermisosGuard)
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Get()
  @RutaProtegida({ ruta: '/solicitudes', accion: 'puede_ver' })
  findAll(): Promise<Solicitudes[]> {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/solicitudes', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Solicitudes> {
    return this.solicitudesService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/solicitudes', accion: 'puede_crear' })
  create(@Body() data: Partial<Solicitudes>): Promise<Solicitudes> {
    return this.solicitudesService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/solicitudes', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Solicitudes>): Promise<Solicitudes> {
    return this.solicitudesService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/solicitudes', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.solicitudesService.remove(+id);
  }
}
