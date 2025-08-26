import { IsInt, IsOptional, IsString, Min } from 'class-validator';

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
}

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
}
