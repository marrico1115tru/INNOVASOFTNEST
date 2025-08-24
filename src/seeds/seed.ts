import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Rol } from '../roles/entities/rol.entity';
import { Usuarios } from '../usuarios/entities/usuarios.entity';
import { Areas } from '../areas/entities/Areas.entity';
import { Modulo } from '../modulo/entities/modulo.entity';
import { Opcion } from '../opciones/entities/opcion.entity';
import { Permiso } from '../permisos/entities/permiso.entity';

async function runSeeder() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  console.log('--- 🚀 Iniciando Seeder ---');

  // Repositorios
  const rolRepo = appContext.get<Repository<Rol>>(getRepositoryToken(Rol));
  const usuarioRepo = appContext.get<Repository<Usuarios>>(
    getRepositoryToken(Usuarios),
  );
  const areaRepo = appContext.get<Repository<Areas>>(getRepositoryToken(Areas));
  const moduloRepo = appContext.get<Repository<Modulo>>(
    getRepositoryToken(Modulo),
  );
  const opcionRepo = appContext.get<Repository<Opcion>>(
    getRepositoryToken(Opcion),
  );
  const permisoRepo = appContext.get<Repository<Permiso>>(
    getRepositoryToken(Permiso),
  );

  // --- 1. Crear Rol y Usuario Administrador ---
  let rolAdmin = await rolRepo.findOne({ where: { nombreRol: 'ADMINISTRADOR' } });
  if (!rolAdmin) {
    rolAdmin = await rolRepo.save(
      rolRepo.create({ nombreRol: 'ADMINISTRADOR' }),
    );
    console.log('✅ Rol ADMINISTRADOR creado');
  } else {
    console.log('ℹ️  Rol ADMINISTRADOR ya existe');
  }

  let areaAdmin = await areaRepo.findOne({
    where: { nombreArea: 'Administración' },
  });
  if (!areaAdmin) {
    areaAdmin = await areaRepo.save(
      areaRepo.create({ nombreArea: 'Administración' }),
    );
  }

  let adminUser = await usuarioRepo.findOne({
    where: { email: 'admin@sena.edu.co' },
  });
  if (!adminUser) {
    const hashedPass = await bcrypt.hash('admin123', 10);
    await usuarioRepo.save(
      usuarioRepo.create({
        nombre: 'Administrador',
        email: 'admin@sena.edu.co',
        password: hashedPass,
        rol: rolAdmin,
        idArea: areaAdmin,
      }),
    );
    console.log('✅ Usuario admin@sena.edu.co creado');
  } else {
    console.log('ℹ️  Usuario admin@sena.edu.co ya existe');
  }

  // --- 2. Definición de Módulos y Opciones con las RUTAS DE LA API ---
  const modulosYopciones = {
    Administracion: [
      { nombre: 'Inicio Dashboard', ruta: '/InicioDash' }, // <-- AÑADIDO AQUÍ
      { nombre: 'Gestionar Usuarios', ruta: '/usuarios' },
      { nombre: 'Gestionar Roles', ruta: '/roles' },
      { nombre: 'Gestionar Permisos', ruta: '/permisos' },
    ],
    Productos: [
      { nombre: 'Ver Productos', ruta: '/productos' },
      { nombre: 'Gestionar Categorías', ruta: '/categorias-productos' },
      { nombre: 'Gestionar Inventario', ruta: '/inventario' },
    ],
    Solicitudes: [
      { nombre: 'Gestionar Solicitudes', ruta: '/solicitudes' },
      { nombre: 'Gestionar Entregas', ruta: '/entrega-material' },
      { nombre: 'Gestionar Movimientos', ruta: '/movimientos' },
      { nombre: 'Gestionar Detalles de Solicitud', ruta: '/detalle-solicitud' },
    ],
    Estadisticas: [
      { nombre: 'Estadisticas Productos', ruta: '/VistaProductos' },
      { nombre: 'Estadisticas Usuarios', ruta: '/VistaEstadisticasUsuarios' },
      { nombre: 'Estadisticas Sitios', ruta: '/VistaEstadisticasSitios' },
    ],
    'Reportes de Productos': [
      { nombre: 'Productos por Sitio', ruta: '/report/productosRep/ProductosPorSitio' },
      { nombre: 'Productos Vencidos', ruta: '/report/productosRep/ProductosVencidos' },
      { nombre: 'Productos Proximos a Vencer', ruta: '/report/productosRep/ProductosVencimiento' },
    ],
    'Reportes de Usuarios': [
      { nombre: 'Usuarios por Rol', ruta: '/report/UsuariosRep/UsuariosPorRol' },
      { nombre: 'Historial de Usuarios', ruta: '/report/UsuariosRep/UsuariosHistoria' },
    ],
    Ubicacion: [
      { nombre: 'Gestionar Municipios', ruta: '/municipios' },
      { nombre: 'Gestionar Sedes', ruta: '/sedes' },
      { nombre: 'Gestionar Sitios', ruta: '/sitio' },
      { nombre: 'Gestionar Tipos de Sitio', ruta: '/tipo-sitio' },
    ],
    Formacion: [
      { nombre: 'Gestionar Centros de Formación', ruta: '/centro-formacion' },
      { nombre: 'Gestionar Titulados', ruta: '/titulados' },
      { nombre: 'Gestionar Fichas', ruta: '/fichas-formacion' },
      { nombre: 'Gestionar Áreas', ruta: '/areas' },
    ],
  };

  console.log('--- Creando y asignando módulos, opciones y permisos... ---');
  for (const nombreModulo in modulosYopciones) {
    let moduloDB = await moduloRepo.findOne({ where: { nombreModulo } });
    if (!moduloDB) {
      moduloDB = await moduloRepo.save(moduloRepo.create({ nombreModulo }));
      console.log(`✅ Módulo "${nombreModulo}" creado`);
    }

    for (const opt of modulosYopciones[nombreModulo]) {
      let opcionDB = await opcionRepo.findOne({
        where: { rutaFrontend: opt.ruta },
      });

      if (!opcionDB) {
        opcionDB = await opcionRepo.save(
          opcionRepo.create({
            nombreOpcion: opt.nombre,
            rutaFrontend: opt.ruta,
            modulo: moduloDB,
          }),
        );
        console.log(`   ✅ Opción "${opt.nombre}" (${opt.ruta}) creada`);
      } else {
        if (opcionDB.modulo?.id !== moduloDB.id) {
          opcionDB.modulo = moduloDB;
          await opcionRepo.save(opcionDB);
        }
      }

      const permisoExistente = await permisoRepo.findOne({
        where: { rol: { id: rolAdmin.id }, opcion: { id: opcionDB.id } },
      });

      if (!permisoExistente) {
        await permisoRepo.save(
          permisoRepo.create({
            rol: rolAdmin,
            opcion: opcionDB,
            puedeVer: true,
            puedeCrear: true,
            puedeEditar: true,
            puedeEliminar: true,
          }),
        );
        console.log(`   ✅ Permisos para "${opcionDB.nombreOpcion}" asignados`);
      }
    }
  }

  await appContext.close();
  console.log('--- ✅ Seeder ejecutado correctamente ---');
}

runSeeder().catch((error) => {
  console.error('--- ❌ Error ejecutando el seeder: ---', error);
  process.exit(1);
});