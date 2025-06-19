import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Titulados } from './entities/Titulados';
import { TituladosService } from './titulados.service';
import { TituladosController } from './titulados.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Titulados])],
  controllers: [TituladosController],
  providers: [TituladosService],
})
export class TituladosModule {}
