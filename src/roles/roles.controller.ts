import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Rol } from './entities/rol';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todas las rutas del controlador
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
  update(
    @Param('id') id: string,
    @Body() rolData: Partial<Rol>,
  ): Promise<Rol> {
    return this.rolesService.update(+id, rolData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }

  // Ruta opcional para probar acceso al usuario autenticado
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
