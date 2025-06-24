export interface RutaPermiso {
  ruta: string;
  puede_ver: boolean;
  puede_crear: boolean;
  puede_editar: boolean;
  puede_eliminar: boolean;
}

export interface JwtPayload {
  sub: number;
  email: string;
  rol: string;
  permisos: RutaPermiso[];
}
