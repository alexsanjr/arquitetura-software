/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateAtorDto } from './create-ator.dto';

export class UpdateAtoreDto extends PartialType(CreateAtorDto) { }
