import { Test, TestingModule } from '@nestjs/testing';
import { DetalleSolicitudService } from './detalle_solicitud.service';

describe('DetalleSolicitudService', () => {
  let service: DetalleSolicitudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleSolicitudService],
    }).compile();

    service = module.get<DetalleSolicitudService>(DetalleSolicitudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
