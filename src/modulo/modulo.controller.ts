import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { Modulo } from './entities/modulo';

@Controller('modulos')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Get()
  findAll(): Promise<Modulo[]> {
    return this.moduloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Modulo> {
    return this.moduloService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Modulo>): Promise<Modulo> {
    return this.moduloService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Modulo>): Promise<Modulo> {
    return this.moduloService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moduloService.remove(+id);
  }
}
