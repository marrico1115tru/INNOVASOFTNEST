import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from '../roles/entities/rol.entity';
import { Usuarios } from '../usuarios/entities/usuarios.entity';
import { Areas } from '../areas/entities/Areas.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, Usuarios, Areas])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
