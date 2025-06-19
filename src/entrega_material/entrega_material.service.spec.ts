import { Test, TestingModule } from '@nestjs/testing';
import { EntregaMaterialService } from './entrega_material.service';

describe('EntregaMaterialService', () => {
  let service: EntregaMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntregaMaterialService],
    }).compile();

    service = module.get<EntregaMaterialService>(EntregaMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
