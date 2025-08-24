import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolesService {
  findById(id_rol: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find({ relations: ['permisos', 'usuarios'] });
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({
      where: { id },
      relations: ['permisos', 'usuarios'],
    });
    if (!rol) throw new NotFoundException(`Rol con id ${id} no encontrado`);
    return rol;
  }

  async create(data: Partial<Rol>): Promise<Rol> {
    const nuevo = this.rolRepository.create(data);
    return await this.rolRepository.save(nuevo);
  }

  async update(id: number, data: Partial<Rol>): Promise<Rol> {
    const rol = await this.findOne(id);
    Object.assign(rol, data);
    return await this.rolRepository.save(rol);
  }

  async remove(id: number): Promise<void> {
    const rol = await this.findOne(id);
    await this.rolRepository.remove(rol);
  }
}
