import { Test, TestingModule } from '@nestjs/testing';
import { TituladosService } from './titulados.service';

describe('TituladosService', () => {
  let service: TituladosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TituladosService],
    }).compile();

    service = module.get<TituladosService>(TituladosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
