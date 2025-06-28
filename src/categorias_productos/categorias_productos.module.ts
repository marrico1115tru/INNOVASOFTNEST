import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasProductos } from './entities/CategoriasProductos';
import { CategoriasProductosService } from './categorias_productos.service';
import { CategoriasProductosController } from './categorias_productos.controller';
import { AuthModule } from '../auth/auth.module'; // Asegura acceso a JwtService desde el AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriasProductos]),
    forwardRef(() => AuthModule), // Permite usar JwtAuthGuard
  ],
  controllers: [CategoriasProductosController],
  providers: [CategoriasProductosService],
  exports: [CategoriasProductosService, TypeOrmModule],
})
export class CategoriasProductosModule {}
