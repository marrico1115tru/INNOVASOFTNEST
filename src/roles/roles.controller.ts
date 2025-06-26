import { RolesService } from './roles.service';
import { Rol } from './entities/rol';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.findOne(+id);
  }

  @Post()
  create(@Body() rolData: Partial<Rol>): Promise<Rol> {
    return this.rolesService.create(rolData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() rolData: Partial<Rol>): Promise<Rol> {
    return this.rolesService.update(+id, rolData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }
}
