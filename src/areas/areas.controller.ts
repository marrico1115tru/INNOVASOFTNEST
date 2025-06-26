import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AreasService } from './areas.service';
import { Areas } from './entities/Areas';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  findAll(): Promise<Areas[]> {
    return this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Areas> {
    return this.areasService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Areas>): Promise<Areas> {
    return this.areasService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Areas>): Promise<Areas> {
    return this.areasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.areasService.remove(+id);
  }
}
