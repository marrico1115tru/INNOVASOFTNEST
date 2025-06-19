import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichasFormacion } from './entities/FichasFormacion';

@Injectable()
export class FichasFormacionService {
  constructor(
    @InjectRepository(FichasFormacion)
    private readonly fichaRepo: Repository<FichasFormacion>,
  ) {}

  findAll(): Promise<FichasFormacion[]> {
    return this.fichaRepo.find({
      relations: [
        'idTitulado',
        'idUsuarioResponsable',
        'usuarios',
        'entregaMaterials',
      ],
    });
  }

  async findOne(id: number): Promise<FichasFormacion> {
    const ficha = await this.fichaRepo.findOne({
      where: { id },
      relations: [
        'idTitulado',
        'idUsuarioResponsable',
        'usuarios',
        'entregaMaterials',
      ],
    });

    if (!ficha) {
      throw new NotFoundException(`Ficha con ID ${id} no encontrada`);
    }

    return ficha;
  }

  create(data: Partial<FichasFormacion>): Promise<FichasFormacion> {
    const nueva = this.fichaRepo.create(data);
    return this.fichaRepo.save(nueva);
  }

  async update(id: number, data: Partial<FichasFormacion>): Promise<FichasFormacion> {
    const ficha = await this.findOne(id);
    Object.assign(ficha, data);
    return this.fichaRepo.save(ficha);
  }

  async remove(id: number): Promise<void> {
    const ficha = await this.findOne(id);
    await this.fichaRepo.remove(ficha);
  }
}
