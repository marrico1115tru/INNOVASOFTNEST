import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { SitioService } from './sitio.service';
import { Sitio } from './entities/Sitio';

@Controller('sitio')
export class SitioController {
  constructor(private readonly sitioService: SitioService) {}

  @Get()
  findAll(): Promise<Sitio[]> {
    return this.sitioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sitio> {
    return this.sitioService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Sitio>): Promise<Sitio> {
    return this.sitioService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Sitio>): Promise<Sitio> {
    return this.sitioService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.sitioService.remove(+id);
  }
}
