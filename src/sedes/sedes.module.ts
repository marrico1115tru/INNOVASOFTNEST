import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sedes } from './entities/Sedes';
import { SedesService } from './sedes.service';
import { SedesController } from './sedes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sedes])],
  controllers: [SedesController],
  providers: [SedesService],
})
export class SedesModule {}
