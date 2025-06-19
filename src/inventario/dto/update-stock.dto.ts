import { IsIn, IsInt, IsPositive } from 'class-validator';

export class UpdateStockDto {
  @IsIn(['ENTRADA', 'SALIDA'], { message: 'El tipo debe ser ENTRADA o SALIDA' })
  tipo: 'ENTRADA' | 'SALIDA';

  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser mayor que 0' })
  cantidad: number;
}
