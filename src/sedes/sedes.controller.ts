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
import { SedesService } from './sedes.service';
import { Sedes } from './entities/Sedes.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todas las rutas del controlador
@Controller('sedes')
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Get()
  findAll(): Promise<Sedes[]> {
    return this.sedesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sedes> {
    return this.sedesService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Sedes>): Promise<Sedes> {
    return this.sedesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Sedes>,
  ): Promise<Sedes> {
    return this.sedesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.sedesService.remove(+id);
  }

  // Ruta opcional para probar el decorador @User()
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
