import { PartialType } from '@nestjs/mapped-types';
import { CreateDiegoDto } from './create-diego.dto';

export class UpdateDiegoDto extends PartialType(CreateDiegoDto) {}
