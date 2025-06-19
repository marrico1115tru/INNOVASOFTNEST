import { Test, TestingModule } from '@nestjs/testing';
import { TipoSitioService } from './tipo_sitio.service';

describe('TipoSitioService', () => {
  let service: TipoSitioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoSitioService],
    }).compile();

    service = module.get<TipoSitioService>(TipoSitioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
