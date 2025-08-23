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
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/Inventario';
import { UpdateStockDto } from './dto/update-stock.dto';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) 
@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  findAll(): Promise<Inventario[]> {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inventario> {
    return this.inventarioService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: Partial<Inventario>,
    @User() user: any, 
  ): Promise<Inventario> {
    return this.inventarioService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Inventario>,
  ): Promise<Inventario> {
    return this.inventarioService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.inventarioService.remove(+id);
  }

  @Put(':id/mover-stock')
  moverStock(
    @Param('id') id: string,
    @Body() data: UpdateStockDto,
    @User() user: any, 
  ): Promise<Inventario> {
    return this.inventarioService.moverStock(+id, data);
  }

  
  @Get('usuario/perfil')
  getUsuarioAutenticado(@User() user: any) {
    return {
      message: 'Usuario autenticado correctamente',
      user,
    };
  }
}
