import { Test, TestingModule } from '@nestjs/testing';
import { FichasFormacionService } from './fichas_formacion.service';

describe('FichasFormacionService', () => {
  let service: FichasFormacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FichasFormacionService],
    }).compile();

    service = module.get<FichasFormacionService>(FichasFormacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
