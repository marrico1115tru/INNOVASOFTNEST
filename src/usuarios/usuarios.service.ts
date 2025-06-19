import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/Usuarios';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  async findAll(): Promise<Usuarios[]> {
    return this.usuarioRepository.find({
      relations: ['rol', 'idArea', 'idFichaFormacion'],
    });
  }

  async findOne(id: number): Promise<Usuarios> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['rol', 'idArea', 'idFichaFormacion'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async create(data: Partial<Usuarios>): Promise<Usuarios> {
    const nuevo = this.usuarioRepository.create(data);
    return this.usuarioRepository.save(nuevo);
  }

  async update(id: number, data: Partial<Usuarios>): Promise<Usuarios> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, data);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}
