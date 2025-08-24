import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichasFormacion } from './entities/FichasFormacion.entity';
import { FichasFormacionService } from './fichas_formacion.service';
import { FichasFormacionController } from './fichas_formacion.controller';
import { AuthModule } from '../auth/auth.module'; // Para usar JwtAuthGuard y @User()

@Module({
  imports: [
    TypeOrmModule.forFeature([FichasFormacion]),
    forwardRef(() => AuthModule), // Previene problemas de dependencias circulares
  ],
  controllers: [FichasFormacionController],
  providers: [FichasFormacionService],
  exports: [FichasFormacionService, TypeOrmModule],
})
export class FichasFormacionModule {}
