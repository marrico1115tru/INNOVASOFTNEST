import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasProductos } from './entities/CategoriasProductos';
import { CategoriasProductosService } from './categorias_productos.service';
import { CategoriasProductosController } from './categorias_productos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriasProductos])],
  controllers: [CategoriasProductosController],
  providers: [CategoriasProductosService],
})
export class CategoriasProductosModule {}
