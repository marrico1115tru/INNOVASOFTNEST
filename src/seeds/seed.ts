import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';  
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// --- ¡Importa todas las entidades que necesitas! ---
import { Rol } from '../roles/entities/rol.entity';
import { Usuarios } from '../usuarios/entities/usuarios.entity';
import { Areas } from '../areas/entities/Areas.entity';
import { Modulo } from '../modulo/entities/modulo.entity';
import { Opcion } from '../opciones/entities/opcion.entity';
import { Permiso } from '../permisos/entities/permiso.entity';

async function runSeeder() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  console.log('--- 🚀 Iniciando Seeder ---');

  // --- Obtener los repositorios ---
  const rolRepo = appContext.get<Repository<Rol>>(getRepositoryToken(Rol));
  const usuarioRepo = appContext.get<Repository<Usuarios>>(getRepositoryToken(Usuarios));
  const areaRepo = appContext.get<Repository<Areas>>(getRepositoryToken(Areas));
  const moduloRepo = appContext.get<Repository<Modulo>>(getRepositoryToken(Modulo));
  const opcionRepo = appContext.get<Repository<Opcion>>(getRepositoryToken(Opcion));
  const permisoRepo = appContext.get<Repository<Permiso>>(getRepositoryToken(Permiso));

  // --- 1. Crear Rol de Administrador ---
  let rolAdmin = await rolRepo.findOne({ where: { nombreRol: 'ADMINISTRADOR' } });
  if (!rolAdmin) {
    rolAdmin = rolRepo.create({ nombreRol: 'ADMINISTRADOR' });
    await rolRepo.save(rolAdmin);
    console.log('✅ Rol ADMINISTRADOR creado');
  } else {
    console.log('ℹ️  Rol ADMINISTRADOR ya existe');
  }

  // --- 2. Crear Área de Administración ---
  let areaAdmin = await areaRepo.findOne({ where: { nombreArea: 'Administración' } });
  if (!areaAdmin) {
    areaAdmin = areaRepo.create({ nombreArea: 'Administración' });
    await areaRepo.save(areaAdmin);
    console.log('✅ Área Administración creada');
  } else {
    console.log('ℹ️  Área Administración ya existe');
  }

  // --- 3. Crear Usuario Administrador ---
  let adminUser = await usuarioRepo.findOne({ where: { email: 'admin@sena.edu.co' } });
  if (!adminUser) {
    const hashedPass = await bcrypt.hash('admin123', 10);
    adminUser = usuarioRepo.create({
      nombre: 'Administrador',
      email: 'admin@sena.edu.co',
      password: hashedPass,
      rol: rolAdmin,
      idArea: areaAdmin,
    });
    await usuarioRepo.save(adminUser);
    console.log('✅ Usuario admin@sena.edu.co creado con contraseña "admin123"');
  } else {
    console.log('ℹ️  Usuario admin@sena.edu.co ya existe');
  }

  // --- 4. Crear Módulos y Opciones (Basado en tus capturas) ---
  const modulosYopciones = {
    'Home': [
        { nombre: 'Inicio', ruta: '/inicio' },
        { nombre: 'Inicio Dashboard', ruta: '/InicioDash' }
    ],
    'Productos': [
        { nombre: 'Ver Productos', ruta: '/productos/listar' },
        { nombre: 'Categorias Productos', ruta: '/CategoriasProductosPage' },
        { nombre: 'Inventario', ruta: '/InventarioPage' }
    ],
    'Solicitudes': [
        { nombre: 'Solicitudes', ruta: '/SolicitudesPage' },
        { nombre: 'Detalle de Solicitud', ruta: '/DetalleSolicitudPage' },
        { nombre: 'Entrega de Material', ruta: '/EntregaMaterialPage' },
        { nombre: 'Movimientos de Inventario', ruta: '/MovimientoInventarioPage' }
    ],
    'Estadisticas': [
        { nombre: 'Estadisticas Productos', ruta: '/VistaProductos' },
        { nombre: 'Estadisticas Usuarios', ruta: '/VistaEstadisticasUsuarios' },
        { nombre: 'Estadisticas Sitios', ruta: '/VistaEstadisticasSitios' }
    ],
    'Reportes de Productos': [
        { nombre: 'Productos por Sitio', ruta: '/report/productosRep/ProductosPorSitio' },
        { nombre: 'Productos Proximos a Vencer', ruta: '/report/productosRep/ProductosVencimiento' }
    ],
    'Reportes de Usuarios': [
        { nombre: 'Usuarios por Rol', ruta: '/report/UsuariosRep/UsuariosPorRol' },
        { nombre: 'Historial de Usuarios', ruta: '/report/UsuariosRep/UsuariosHistoria' }
    ],
    'Administracion': [
        { nombre: 'Usuarios', ruta: '/usuarios' },
        { nombre: 'Roles', ruta: '/RolesPage' },
        { nombre: 'Permisos por Rol', ruta: '/permisos/rol/:idRol' },
        { nombre: 'Usuarios - Lista', ruta: '/usuarios' },
        { nombre: 'Usuarios - ID', ruta: '/usuarios/:id' }
    ],
    'Ubicacion': [
        { nombre: 'Municipios', ruta: '/MunicipioPage' },
        { nombre: 'Sedes', ruta: '/SedesPage' },
        { nombre: 'Sitios', ruta: '/SitiosPage' },
        { nombre: 'Tipos de Sitio', ruta: '/Tipo_sitiosPage' }
    ],
    'Formacion': [
        { nombre: 'Centros de Formacion', ruta: '/CentrosFormaciones' },
        { nombre: 'Titulados', ruta: '/TituladosPage' },
        { nombre: 'Fichas de Formacion', ruta: '/FichaFormacionPage' },
        { nombre: 'Areas de Formacion', ruta: '/AreasPage' }
    ],
  };

  console.log('--- Creando módulos y opciones... ---');
  const todasLasOpciones: Opcion[] = [];

  for (const nombreModulo in modulosYopciones) {
    let moduloDB = await moduloRepo.findOne({ where: { nombreModulo: nombreModulo } });
    if (!moduloDB) {
      moduloDB = moduloRepo.create({ nombreModulo: nombreModulo });
      await moduloRepo.save(moduloDB);
      console.log(`✅ Módulo "${nombreModulo}" creado`);
    }

    for (const opt of modulosYopciones[nombreModulo]) {
      let opcionDB = await opcionRepo.findOne({ where: { nombreOpcion: opt.nombre } });
      if (!opcionDB) {
        opcionDB = opcionRepo.create({
          nombreOpcion: opt.nombre,
          rutaFrontend: opt.ruta,
          modulo: moduloDB,
        });
        await opcionRepo.save(opcionDB);
        console.log(`   ✅ Opción "${opt.nombre}" creada`);
      }
      todasLasOpciones.push(opcionDB);
    }
  }

  // --- 5. Asignar TODOS los permisos al rol de Administrador ---
  console.log('--- Asignando permisos al rol de ADMINISTRADOR... ---');
  for (const opcion of todasLasOpciones) {
    const permisoExistente = await permisoRepo.findOne({
      where: { rol: { id: rolAdmin.id }, opcion: { id: opcion.id } },
    });

    if (!permisoExistente) {
      const nuevoPermiso = permisoRepo.create({
        rol: rolAdmin,
        opcion: opcion,
        puedeVer: true,
        puedeCrear: true,
        puedeEditar: true,
        puedeEliminar: true,
      });
      await permisoRepo.save(nuevoPermiso);
      console.log(`✅ Permisos completos para "${opcion.nombreOpcion}" asignados`);
    }
  }

  await appContext.close();
  console.log('--- ✅ Seeder ejecutado correctamente ---');
}

runSeeder().catch((error) => {
  console.error('--- ❌ Error ejecutando el seeder: ---', error);
  process.exit(1);
});