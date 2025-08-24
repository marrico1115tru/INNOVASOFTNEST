import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { Areas } from './entities/Areas.entity';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { User } from './../auth/decorators/user.decorator';

@UseGuards(JwtGuard) // 🔐 Protege todo el controlador
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  findAll(): Promise<Areas[]> {
    return this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Areas> {
    return this.areasService.findOne(+id);
  }

  @Post()
  create(
    @Body() data: Partial<Areas>,
    @User() user: any, // 👤 Usuario autenticado disponible si lo necesitas
  ): Promise<Areas> {
    return this.areasService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Areas>,
    @User() user: any, // 👤 Usuario autenticado disponible si lo necesitas
  ): Promise<Areas> {
    return this.areasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.areasService.remove(+id);
  }
}
