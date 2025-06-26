import { FichasFormacionService } from './fichas_formacion.service';
import { FichasFormacion } from './entities/FichasFormacion';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('fichas-formacion')
export class FichasFormacionController {
  constructor(private readonly fichasService: FichasFormacionService) {}

  @Get()
  findAll(): Promise<FichasFormacion[]> {
    return this.fichasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FichasFormacion> {
    return this.fichasService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<FichasFormacion>): Promise<FichasFormacion> {
    return this.fichasService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<FichasFormacion>): Promise<FichasFormacion> {
    return this.fichasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fichasService.remove(+id);
  }
}
