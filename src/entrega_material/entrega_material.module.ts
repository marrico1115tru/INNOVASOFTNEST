import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaMaterial } from './entities/EntregaMaterial';
import { EntregaMaterialService } from './entrega_material.service';
import { EntregaMaterialController } from './entrega_material.controller';
import { AuthModule } from '../auth/auth.module'; // Importa AuthModule para usar JwtAuthGuard

@Module({
  imports: [
    TypeOrmModule.forFeature([EntregaMaterial]),
    forwardRef(() => AuthModule), // Permite usar JwtAuthGuard y JwtService
  ],
  controllers: [EntregaMaterialController],
  providers: [EntregaMaterialService],
  exports: [EntregaMaterialService, TypeOrmModule],
})
export class EntregaMaterialModule {}
