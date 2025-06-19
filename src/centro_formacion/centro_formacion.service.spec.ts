import { Test, TestingModule } from '@nestjs/testing';
import { CentroFormacionService } from './centro_formacion.service';

describe('CentroFormacionService', () => {
  let service: CentroFormacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentroFormacionService],
    }).compile();

    service = module.get<CentroFormacionService>(CentroFormacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
