import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DetalleSolicitudService } from './detalle_solicitud.service';
import { DetalleSolicitud } from './entities/DetalleSolicitud';

@Controller('detalle-solicitud')
export class DetalleSolicitudController {
  constructor(private readonly detalleService: DetalleSolicitudService) {}

  @Get()
  findAll(): Promise<DetalleSolicitud[]> {
    return this.detalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DetalleSolicitud> {
    return this.detalleService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<DetalleSolicitud>): Promise<DetalleSolicitud> {
    return this.detalleService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<DetalleSolicitud>): Promise<DetalleSolicitud> {
    return this.detalleService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.detalleService.remove(+id);
  }
}
