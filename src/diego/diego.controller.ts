import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiegoService } from './diego.service';
import { CreateDiegoDto } from './dto/create-diego.dto';
import { UpdateDiegoDto } from './dto/update-diego.dto';

@Controller('diego')
export class DiegoController {
  constructor(private readonly diegoService: DiegoService) {}

  @Post()
  create(@Body() createDiegoDto: CreateDiegoDto) {
    return this.diegoService.create(createDiegoDto);
  }

  @Get()
  findAll() {
    return this.diegoService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diegoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiegoDto: UpdateDiegoDto) {
    return this.diegoService.update(+id, updateDiegoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diegoService.remove(+id);
  }
}
