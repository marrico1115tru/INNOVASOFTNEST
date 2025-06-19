import { Test, TestingModule } from '@nestjs/testing';
import { EntregaMaterialController } from './entrega_material.controller';

describe('EntregaMaterialController', () => {
  let controller: EntregaMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntregaMaterialController],
    }).compile();

    controller = module.get<EntregaMaterialController>(EntregaMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
