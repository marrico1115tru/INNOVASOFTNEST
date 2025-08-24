import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EntregaMaterialService } from './entrega_material.service';
import { EntregaMaterial } from './entities/EntregaMaterial.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todo el controlador
@Controller('entrega-material')
export class EntregaMaterialController {
  constructor(private readonly entregaService: EntregaMaterialService) {}

  @Get()
  findAll(): Promise<EntregaMaterial[]> {
    return this.entregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EntregaMaterial> {
    return this.entregaService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: Partial<EntregaMaterial>,
    @User() user: any, // 👤 Acceso al usuario autenticado
  ): Promise<EntregaMaterial> {
    // Puedes usar user.idUsuario para registrar quién hizo la entrega
    return this.entregaService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<EntregaMaterial>,
  ): Promise<EntregaMaterial> {
    return this.entregaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.entregaService.remove(+id);
  }

  // Ruta opcional para verificar autenticación
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
