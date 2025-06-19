import { Test, TestingModule } from '@nestjs/testing';
import { SitioController } from './sitio.controller';

describe('SitioController', () => {
  let controller: SitioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SitioController],
    }).compile();

    controller = module.get<SitioController>(SitioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
