import { Test, TestingModule } from '@nestjs/testing';
import { DiegoService } from './diego.service';

describe('DiegoService', () => {
  let service: DiegoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiegoService],
    }).compile();

    service = module.get<DiegoService>(DiegoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
