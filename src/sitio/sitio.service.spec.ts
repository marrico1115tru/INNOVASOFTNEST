import { Test, TestingModule } from '@nestjs/testing';
import { SitioService } from './sitio.service';

describe('SitioService', () => {
  let service: SitioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SitioService],
    }).compile();

    service = module.get<SitioService>(SitioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
