import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './entities/Inventario.entity';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ Asegura que el guardia JWT funcione

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario]),
    forwardRef(() => AuthModule), // ✅ Para usar JwtService dentro de guardias
  ],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService, TypeOrmModule], // ✅ Exporta el servicio y repositorio si otros módulos lo necesitan
})
export class InventarioModule {}
