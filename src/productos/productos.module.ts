import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './entities/Productos';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { AuthModule } from '../auth/auth.module'; // Importa el módulo de autenticación

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos]),
    forwardRef(() => AuthModule), // Necesario si JwtAuthGuard se usa en este módulo
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService, TypeOrmModule], // Exporta si otros módulos necesitan acceso
})
export class ProductosModule {}
