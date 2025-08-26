import { IsArray, IsInt, IsString } from 'class-validator';

export class RegistrarMultipleDto {
  @IsInt()
  idProducto: number;

  @IsInt()
  fkSitio: number;

  @IsArray()
  @IsString({ each: true })
  placasSena: string[];
}
