import { RolesService } from './roles.service';
import { Rol } from './entities/rol';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('roles')
@UseGuards(PermisosGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @RutaProtegida({ ruta: '/roles', accion: 'puede_ver' })
  findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/roles', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/roles', accion: 'puede_crear' })
  create(@Body() rolData: Partial<Rol>): Promise<Rol> {
    return this.rolesService.create(rolData);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/roles', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() rolData: Partial<Rol>): Promise<Rol> {
    return this.rolesService.update(+id, rolData);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/roles', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }
}
