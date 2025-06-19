import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaMaterial } from './entities/EntregaMaterial';
import { EntregaMaterialService } from './entrega_material.service';
import { EntregaMaterialController } from './entrega_material.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EntregaMaterial])],
  controllers: [EntregaMaterialController],
  providers: [EntregaMaterialService],
})
export class EntregaMaterialModule {}
