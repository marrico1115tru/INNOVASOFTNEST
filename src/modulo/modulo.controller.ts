import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { Modulo } from './entities/modulo';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todo el controlador
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
  create(@Body() data: Partial<Modulo>, @User() user: any): Promise<Modulo> {
    // Puedes usar user.idUsuario si necesitas registrar quién crea el módulo
    return this.moduloService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Modulo>,
  ): Promise<Modulo> {
    return this.moduloService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moduloService.remove(+id);
  }

  // Ruta opcional para verificar autenticación y acceso al usuario
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
