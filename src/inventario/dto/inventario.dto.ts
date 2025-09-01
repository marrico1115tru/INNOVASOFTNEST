import { IsInt, IsOptional, IsString, Min, IsDateString, IsIn, IsPositive, IsArray } from 'class-validator';

// DTO para creación de inventario (fechaEntrada obligatoria)
export class CreateInventarioDto {
  @IsInt()
  idProductoId: number;

  @IsInt()
  fkSitioId: number;

  @IsInt()
  @Min(1)
  stock: number;

  @IsOptional()
  @IsString()
  placaSena?: string;

  @IsDateString()
  fechaEntrada: string;  // Obligatoria y formato ISO
}

// DTO para actualización de inventario (propiedades opcionales)
export class UpdateInventarioDto {
  @IsOptional()
  @IsInt()
  idProductoId?: number;

  @IsOptional()
  @IsInt()
  fkSitioId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  stock?: number;

  @IsOptional()
  @IsString()
  placaSena?: string;

  @IsOptional()
  @IsDateString()
  fechaEntrada?: string;

  @IsOptional()
  @IsDateString()
  fechaSalida?: string | null;
}