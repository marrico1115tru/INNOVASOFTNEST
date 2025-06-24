import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DetalleSolicitudService } from './detalle_solicitud.service';
import { DetalleSolicitud } from './entities/DetalleSolicitud';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('detalle-solicitud')
@UseGuards(PermisosGuard)
export class DetalleSolicitudController {
  constructor(private readonly detalleService: DetalleSolicitudService) {}

  @Get()
  @RutaProtegida({ ruta: '/detalle-solicitud', accion: 'puede_ver' })
  findAll(): Promise<DetalleSolicitud[]> {
    return this.detalleService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/detalle-solicitud', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<DetalleSolicitud> {
    return this.detalleService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/detalle-solicitud', accion: 'puede_crear' })
  create(@Body() data: Partial<DetalleSolicitud>): Promise<DetalleSolicitud> {
    return this.detalleService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/detalle-solicitud', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<DetalleSolicitud>): Promise<DetalleSolicitud> {
    return this.detalleService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/detalle-solicitud', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.detalleService.remove(+id);
  }
}