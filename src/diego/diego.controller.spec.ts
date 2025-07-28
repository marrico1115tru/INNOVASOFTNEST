import { Test, TestingModule } from '@nestjs/testing';
import { DiegoController } from './diego.controller';
import { DiegoService } from './diego.service';

describe('DiegoController', () => {
  let controller: DiegoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiegoController],
      providers: [DiegoService],
    }).compile();

    controller = module.get<DiegoController>(DiegoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
