<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# Backend INNOVASOFT

Este es el *backend del sistema INNOVASOFT, desarrollado con **NestJS, **TypeORM* y *PostgreSQL*, que gestiona la trazabilidad de materiales, inventario y solicitudes.

---

## Dependencias principales

- [NestJS](https://nestjs.com/) v11  
- [TypeORM](https://typeorm.io/) v0.3  
- [PostgreSQL](https://www.postgresql.org/)  
- [JWT](https://jwt.io/) (autenticación)  
- [Docker](https://www.docker.com/) (orquestación de servicios)  

---

## Instalación

Clona el repositorio e instala dependencias:

``` bash
git clone https://github.com/marrico1115tru/INNOVASOFTNEST.git
cd INNOVASOFTNEST
npm install
```

---


## Ejecutar el proyecto

 Desarrollo

``` bash
 npm run start:dev

``` 
---


## Uso con Docker
 El proyecto incluye un archivo docker-compose.yml para una fácil orquestación. Asegúrate de estar en la carpeta que contiene el docker-compose.yml (por ejemplo, DOCKERINNOVASOFT).


```bash
 docker-compose up -d --build

```
---

## Detener contenedores:

``` bash
 docker-compose down
```

---

## Migraciones (TypeORM)

Generar migración:


```bash
docker exec -it dockerinnovasoft-backend-1 sh -c "npm run typeorm -- migration:generate src/database/migrations/"NOMBRE DE LA MIGRACION"
```
---


## Ejecutar migracion en la base de datos:

``` bash
docker exec -it dockerinnovasoft-backend-1 sh -c "npm run typeorm -- migration:run"

```
---


## Seed inicial
Para cargar datos iniciales (usuarios, roles, etc.):

``` bash
docker exec -it dockerinnovasoft-backend-1 sh -c "npx ts-node -r tsconfig-paths/register src/seeds/seed.ts"
```

---


## Estructura del proyecto

```bash

src/
 ┣ areas/               # Módulo de áreas
 ┣ auth/                # Autenticación y JWT
 ┣ categorias_productos/ # Categorías de productos
 ┣ centro_formacion/    # Centros de formación
 ┣ database/            # Configuración DB y TypeORM
 ┣ detalle_solicitud/   # Detalles de solicitudes
 ┣ entrega_material/    # Registro de entregas
 ┣ fichas_formacion/    # Fichas de formación
 ┣ inventario/          # Inventario y control de stock
 ┣ movimientos/         # Movimientos de productos
 ┣ municipios/          # Municipios asociados
 ┣ opciones/            # Opciones del sistema
 ┣ permisos/            # Permisos de usuarios
 ┣ productos/           # Productos
 ┣ roles/               # Roles de usuario
 ┣ sedes/               # Sedes
 ┣ seeds/               # Seeds iniciales
 ┣ sitio/               # Sitios
 ┣ solicitudes/         # Solicitudes
 ┣ tipo_sitio/          # Tipos de sitio
 ┣ titulados/           # Titulados
 ┣ usuarios/            # Usuarios
 ┣ app.module.ts        # Módulo raíz
 ┣ main.ts              # Punto de entrada
 ┗ data-source.ts       # Configuración TypeORM

```
---

## Autores

María Del Mar Rico Trujillo/Andres Felipe Peña Martinez – Proyecto INNOVASOFT

---