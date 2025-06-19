import { Test, TestingModule } from '@nestjs/testing';
import { DetalleSolicitudController } from './detalle_solicitud.controller';

describe('DetalleSolicitudController', () => {
  let controller: DetalleSolicitudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleSolicitudController],
    }).compile();

    controller = module.get<DetalleSolicitudController>(DetalleSolicitudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
