import { CentroFormacionService } from './centro_formacion.service';
import { CentroFormacion } from './entities/CentroFormacion';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('centro-formacion')
export class CentroFormacionController {
  constructor(private readonly centroService: CentroFormacionService) {}

  @Get()
  findAll(): Promise<CentroFormacion[]> {
    return this.centroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CentroFormacion> {
    return this.centroService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<CentroFormacion>): Promise<CentroFormacion> {
    return this.centroService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<CentroFormacion>): Promise<CentroFormacion> {
    return this.centroService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.centroService.remove(+id);
  }
}
