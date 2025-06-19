import { Test, TestingModule } from '@nestjs/testing';
import { FichasFormacionController } from './fichas_formacion.controller';

describe('FichasFormacionController', () => {
  let controller: FichasFormacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FichasFormacionController],
    }).compile();

    controller = module.get<FichasFormacionController>(FichasFormacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
