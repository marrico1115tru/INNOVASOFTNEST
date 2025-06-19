import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OpcionesService } from './opciones.service';
import { Opcion } from './entities/opcion';

@Controller('opciones')
export class OpcionesController {
  constructor(private readonly opcionesService: OpcionesService) {}

  @Get()
  findAll(): Promise<Opcion[]> {
    return this.opcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Opcion> {
    return this.opcionesService.findOne(+id);
  }

  @Post()
  create(@Body() opcionData: Partial<Opcion>): Promise<Opcion> {
    return this.opcionesService.create(opcionData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() opcionData: Partial<Opcion>): Promise<Opcion> {
    return this.opcionesService.update(+id, opcionData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.opcionesService.remove(+id);
  }
}
