import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';  
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rol } from '../roles/entities/rol.entity';
import { Usuarios } from '../usuarios/entities/usuarios.entity';
import { Areas } from '../areas/entities/Areas.entity';
import * as bcrypt from 'bcrypt';

async function runSeeder() {
  // Levantar el contexto de la app NestJS
  const appContext = await NestFactory.createApplicationContext(AppModule);

  // Obtener los repositorios desde Nest
  const rolRepo = appContext.get<Repository<Rol>>(getRepositoryToken(Rol));
  const usuarioRepo = appContext.get<Repository<Usuarios>>(getRepositoryToken(Usuarios));
  const areaRepo = appContext.get<Repository<Areas>>(getRepositoryToken(Areas));

  // Crear rol ADMINISTRADOR si no existe
  let rolAdmin = await rolRepo.findOne({ where: { nombreRol: 'ADMINISTRADOR' } });
  if (!rolAdmin) {
    rolAdmin = rolRepo.create({ nombreRol: 'ADMINISTRADOR' });
    await rolRepo.save(rolAdmin);
    console.log('✅ Rol ADMINISTRADOR creado');
  } else {
    console.log('ℹ Rol ADMINISTRADOR ya existe');
  }

  // Crear área Administración si no existe
  let areaAdmin = await areaRepo.findOne({ where: { nombreArea: 'Administración' } });
  if (!areaAdmin) {
    areaAdmin = areaRepo.create({ nombreArea: 'Administración' });
    await areaRepo.save(areaAdmin);
    console.log('✅ Área Administración creada');
  } else {
    console.log('ℹ Área Administración ya existe');
  }

  // Crear usuario admin si no existe
  let adminUser = await usuarioRepo.findOne({ where: { email: 'admin@sena.edu.co' } });
  if (!adminUser) {
    const hashedPass = await bcrypt.hash('admin123', 10);
    adminUser = usuarioRepo.create({
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
    await usuarioRepo.save(adminUser);
    console.log('✅ Usuario admin@sena.edu.co creado con contraseña "admin123"');
  } else {
    console.log('ℹ Usuario admin@sena.edu.co ya existe');
  }

  // Cerrar contexto para finalizar el proceso
  await appContext.close();
  console.log('🚀 Seeder ejecutado correctamente');
}

runSeeder().catch((error) => {
  console.error('❌ Error ejecutando el seeder:', error);
  process.exit(1);
});
