import { Test, TestingModule } from '@nestjs/testing';
import { TituladosController } from './titulados.controller';

describe('TituladosController', () => {
  let controller: TituladosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TituladosController],
    }).compile();

    controller = module.get<TituladosController>(TituladosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
