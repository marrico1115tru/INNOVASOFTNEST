import { Module } from '@nestjs/common';
import { DiegoService } from './diego.service';
import { DiegoController } from './diego.controller';

@Module({
  controllers: [DiegoController],
  providers: [DiegoService],
})
export class DiegoModule {}
