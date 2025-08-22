import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from '../roles/entities/rol';
import { Usuarios } from '../usuarios/entities/Usuarios';
import { Areas } from '../areas/entities/Areas';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, Usuarios, Areas])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
