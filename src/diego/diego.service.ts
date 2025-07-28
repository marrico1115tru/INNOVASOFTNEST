import { Injectable } from '@nestjs/common';
import { CreateDiegoDto } from './dto/create-diego.dto';
import { UpdateDiegoDto } from './dto/update-diego.dto';

@Injectable()
export class DiegoService {
  create(createDiegoDto: CreateDiegoDto) {
    return 'This action adds a new diego';
  }

  findAll() {
    return `Hola diego`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diego`;
  }

  update(id: number, updateDiegoDto: UpdateDiegoDto) {
    return `This action updates a #${id} diego`;
  }

  remove(id: number) {
    return `This action removes a #${id} diego`;
  }
}
