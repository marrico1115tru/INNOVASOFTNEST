import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { EntregaMaterialService } from './entrega_material.service';
import { EntregaMaterial } from './entities/EntregaMaterial';

@Controller('entrega-material')
export class EntregaMaterialController {
  constructor(private readonly entregaService: EntregaMaterialService) {}

  @Get()
  findAll(): Promise<EntregaMaterial[]> {
    return this.entregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EntregaMaterial> {
    return this.entregaService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<EntregaMaterial>): Promise<EntregaMaterial> {
    return this.entregaService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<EntregaMaterial>): Promise<EntregaMaterial> {
    return this.entregaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.entregaService.remove(+id);
  }
}
