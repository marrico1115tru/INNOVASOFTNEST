// src/permisos/dto/update-permisos-masivo.dto.ts
import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsBoolean, IsNumber } from 'class-validator';

class PermisoBasicoDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  puedeVer: boolean;

  @IsBoolean()
  puedeCrear: boolean;

  @IsBoolean()
  puedeEditar: boolean;

  @IsBoolean()
  puedeEliminar: boolean;
}

export class UpdatePermisoMasivoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermisoBasicoDto)
  permisos: PermisoBasicoDto[];
}
