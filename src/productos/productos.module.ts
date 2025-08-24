import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './entities/Productos.entity';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos]),
    forwardRef(() => AuthModule), 
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService, TypeOrmModule], 
})
export class ProductosModule {}
