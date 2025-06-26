import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { Sedes } from './entities/Sedes';

@Controller('sedes')
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Get()
  findAll(): Promise<Sedes[]> {
    return this.sedesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sedes> {
    return this.sedesService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Sedes>): Promise<Sedes> {
    return this.sedesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Sedes>): Promise<Sedes> {
    return this.sedesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.sedesService.remove(+id);
  }
}
