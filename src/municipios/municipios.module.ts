// src/municipios/municipios.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipios } from './entities/Municipios.entity';
import { MunicipiosService } from './municipios.service';
import { MunicipiosController } from './municipios.controller';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Municipios]),
    forwardRef(() => AuthModule), // ✅ Para evitar problemas con dependencias circulares
  ],
  controllers: [MunicipiosController],
  providers: [MunicipiosService],
  exports: [MunicipiosService, TypeOrmModule],
})
export class MunicipiosModule {}
