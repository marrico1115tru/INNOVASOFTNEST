import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Titulados } from './entities/Titulados.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TituladosService {
  constructor(
    @InjectRepository(Titulados)
    private readonly tituladosRepo: Repository<Titulados>,
  ) {}

  findAll(): Promise<Titulados[]> {
    return this.tituladosRepo.find({ relations: ['fichasFormacions'] });
  }

  async findOne(id: number): Promise<Titulados> {
    const titulado = await this.tituladosRepo.findOne({
      where: { id },
      relations: ['fichasFormacions'],
    });
    if (!titulado) throw new NotFoundException(`Titulado ${id} no encontrado`);
    return titulado;
  }

  create(data: Partial<Titulados>): Promise<Titulados> {
    const nuevo = this.tituladosRepo.create(data);
    return this.tituladosRepo.save(nuevo);
  }

  async update(id: number, data: Partial<Titulados>): Promise<Titulados> {
    const existente = await this.findOne(id);
    Object.assign(existente, data);
    return this.tituladosRepo.save(existente);
  }

  async remove(id: number): Promise<void> {
    const existente = await this.findOne(id);
    await this.tituladosRepo.remove(existente);
  }
}
