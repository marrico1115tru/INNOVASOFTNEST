import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { Modulo } from './entities/modulo';
import { PermisosGuard } from 'src/auth/guards/permisos.guard';
import { RutaProtegida } from 'src/auth/decorators/ruta-protegida.decorator';

@Controller('modulos')
@UseGuards(PermisosGuard)
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Get()
  @RutaProtegida({ ruta: '/modulos', accion: 'puede_ver' })
  findAll(): Promise<Modulo[]> {
    return this.moduloService.findAll();
  }

  @Get(':id')
  @RutaProtegida({ ruta: '/modulos', accion: 'puede_ver' })
  findOne(@Param('id') id: string): Promise<Modulo> {
    return this.moduloService.findOne(+id);
  }

  @Post()
  @RutaProtegida({ ruta: '/modulos', accion: 'puede_crear' })
  create(@Body() data: Partial<Modulo>): Promise<Modulo> {
    return this.moduloService.create(data);
  }

  @Put(':id')
  @RutaProtegida({ ruta: '/modulos', accion: 'puede_editar' })
  update(@Param('id') id: string, @Body() data: Partial<Modulo>): Promise<Modulo> {
    return this.moduloService.update(+id, data);
  }

  @Delete(':id')
  @RutaProtegida({ ruta: '/modulos', accion: 'puede_eliminar' })
  remove(@Param('id') id: string): Promise<void> {
    return this.moduloService.remove(+id);
  }
}
