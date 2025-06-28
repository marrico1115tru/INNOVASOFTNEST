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
import { CategoriasProductosService } from './categorias_productos.service';
import { CategoriasProductos } from './entities/CategoriasProductos';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todo el controlador
@Controller('categorias-productos')
export class CategoriasProductosController {
  constructor(
    private readonly categoriaService: CategoriasProductosService,
  ) {}

  @Get()
  findAll(): Promise<CategoriasProductos[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoriasProductos> {
    return this.categoriaService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: Partial<CategoriasProductos>,
    @User() user: any, // 👤 Usuario autenticado disponible
  ): Promise<CategoriasProductos> {
    return this.categoriaService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<CategoriasProductos>,
    @User() user: any, // 👤 Usuario autenticado disponible
  ): Promise<CategoriasProductos> {
    return this.categoriaService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriaService.remove(+id);
  }
}
