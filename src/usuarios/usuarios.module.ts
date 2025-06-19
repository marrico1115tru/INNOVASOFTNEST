import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/Usuarios';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Areas } from './../areas/entities/Areas';
import { FichasFormacion } from './../fichas_formacion/entities/FichasFormacion';
import { Rol } from './../roles/entities/rol';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, Areas, FichasFormacion, Rol])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
