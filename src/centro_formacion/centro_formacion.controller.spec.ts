import { Test, TestingModule } from '@nestjs/testing';
import { CentroFormacionController } from './centro_formacion.controller';

describe('CentroFormacionController', () => {
  let controller: CentroFormacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentroFormacionController],
    }).compile();

    controller = module.get<CentroFormacionController>(CentroFormacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
