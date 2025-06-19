import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichasFormacion } from './entities/FichasFormacion';
import { FichasFormacionService } from './fichas_formacion.service';
import { FichasFormacionController } from './fichas_formacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FichasFormacion])],
  controllers: [FichasFormacionController],
  providers: [FichasFormacionService],
})
export class FichasFormacionModule {}
