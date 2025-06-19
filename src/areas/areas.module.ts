import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Areas } from './entities/Areas';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Areas])],
  controllers: [AreasController],
  providers: [AreasService],
})
export class AreasModule {}
