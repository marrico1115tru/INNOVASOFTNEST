import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { Municipios } from './entities/Municipios';

@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get()
  findAll(): Promise<Municipios[]> {
    return this.municipiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Municipios> {
    return this.municipiosService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Municipios>): Promise<Municipios> {
    return this.municipiosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Municipios>): Promise<Municipios> {
    return this.municipiosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.municipiosService.remove(+id);
  }
}
