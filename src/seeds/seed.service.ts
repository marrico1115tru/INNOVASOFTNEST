import { Injectable } from '@nestjs/common';
import { Rol } from '../roles/entities/rol';
import { Usuarios } from '../usuarios/entities/Usuarios';
import { Areas } from '../areas/entities/Areas';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Rol)
    private rolRepo: Repository<Rol>,
    @InjectRepository(Usuarios)
    private usuarioRepo: Repository<Usuarios>,
    @InjectRepository(Areas)
    private areaRepo: Repository<Areas>,
  ) {}

  async run() {
    // Crear rol ADMINISTRADOR si no existe
    let rolAdmin = await this.rolRepo.findOne({ where: { nombreRol: 'ADMINISTRADOR' } });
    if (!rolAdmin) {
      rolAdmin = this.rolRepo.create({ nombreRol: 'ADMINISTRADOR' });
      await this.rolRepo.save(rolAdmin);
      console.log('✅ Rol ADMINISTRADOR creado');
    } else {
      console.log('ℹ Rol ADMINISTRADOR ya existe');
    }

    // Crear área Administración si no existe
    let areaAdmin = await this.areaRepo.findOne({ where: { nombreArea: 'Administración' } });
    if (!areaAdmin) {
      areaAdmin = this.areaRepo.create({ nombreArea: 'Administración' });
      await this.areaRepo.save(areaAdmin);
      console.log('✅ Área Administración creada');
    } else {
      console.log('ℹ Área Administración ya existe');
    }

    // Crear usuario admin si no existe
    let adminUser = await this.usuarioRepo.findOne({ where: { email: 'admin@sena.edu.co' } });
    if (!adminUser) {
      const hashedPass = await bcrypt.hash('admin123', 10);
      adminUser = this.usuarioRepo.create({
        nombre: 'Administrador',
        apellido: '',
        cedula: null,
        email: 'admin@sena.edu.co',
        telefono: null,
        password: hashedPass,
        rol: rolAdmin,
        idArea: areaAdmin,
        idFichaFormacion: null,
      });
      await this.usuarioRepo.save(adminUser);
      console.log('✅ Usuario admin@sena.edu.co creado con contraseña "admin123"');
    } else {
      console.log('ℹ Usuario admin@sena.edu.co ya existe');
    }
  }
}
