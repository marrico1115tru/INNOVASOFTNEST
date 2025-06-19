import { Test, TestingModule } from '@nestjs/testing';
import { TipoSitioController } from './tipo_sitio.controller';

describe('TipoSitioController', () => {
  let controller: TipoSitioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoSitioController],
    }).compile();

    controller = module.get<TipoSitioController>(TipoSitioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
