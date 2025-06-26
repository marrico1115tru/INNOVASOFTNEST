import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TituladosService } from './titulados.service';
import { Titulados } from './entities/Titulados';

@Controller('titulados')
export class TituladosController {
  constructor(private readonly tituladosService: TituladosService) {}

  @Get()
  findAll(): Promise<Titulados[]> {
    return this.tituladosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Titulados> {
    return this.tituladosService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Titulados>): Promise<Titulados> {
    return this.tituladosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Titulados>): Promise<Titulados> {
    return this.tituladosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tituladosService.remove(+id);
  }
}
