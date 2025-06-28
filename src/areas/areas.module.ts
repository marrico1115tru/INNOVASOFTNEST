import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Areas } from './entities/Areas';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Areas]),
    forwardRef(() => AuthModule), 
  ],
  controllers: [AreasController],
  providers: [AreasService],
  exports: [AreasService, TypeOrmModule], 
})
export class AreasModule {}
