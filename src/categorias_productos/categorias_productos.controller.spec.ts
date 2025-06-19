import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasProductosController } from './categorias_productos.controller';

describe('CategoriasProductosController', () => {
  let controller: CategoriasProductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasProductosController],
    }).compile();

    controller = module.get<CategoriasProductosController>(CategoriasProductosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
