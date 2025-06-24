import { SetMetadata } from '@nestjs/common';

export const RUTA = 'ruta';
export const PERMISO = 'permiso';

export interface PermisoRuta {
  ruta: string;
  accion: 'puede_ver' | 'puede_crear' | 'puede_editar' | 'puede_eliminar';
}

export const RutaProtegida = (permiso: PermisoRuta) => {
  return SetMetadata(RUTA, permiso.ruta) && SetMetadata(PERMISO, permiso.accion);
};
