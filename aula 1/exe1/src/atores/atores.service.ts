/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAtorDto } from './dto/create-ator.dto';
import { UpdateAtoreDto } from './dto/update-ator.dto';
import { AtoresRepository } from './atores.repository';

@Injectable()
export class AtoresService {
  constructor(private readonly atoresRepository: AtoresRepository) { }

  create(createAtorDto: CreateAtorDto) {
    if (!createAtorDto || typeof createAtorDto !== 'object') {
      throw new Error('Dados para criação inválidos.');
    }
    const requiredFields = ['nome', 'dataDeNascimento', 'nacionalidade'];
    for (const field of requiredFields) {
      if (!createAtorDto[field]) {
        throw new Error(`Campo obrigatório ausente: ${field}`);
      }
    }
    return this.atoresRepository.create(createAtorDto);
  }

  findAll() {
    const atores = this.atoresRepository.findAll();
    if (!Array.isArray(atores)) {
      throw new Error('Atores não encontrados no banco de dados.');
    }
    return atores;
  }

  findOne(id: number) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('ID inválido.');
    }
    const ator = this.atoresRepository.findById(id);
    if (!ator) {
      throw new Error(`Ator com id ${id} não encontrado.`);
    }
    return ator;
  }

  update(id: number, updateAtoreDto: UpdateAtoreDto) {
    if (!updateAtoreDto || typeof updateAtoreDto !== 'object') {
      throw new Error('Dados para atualização inválidos.');
    }
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('ID inválido.');
    }
    const ator = this.atoresRepository.findById(id);
    if (!ator) {
      throw new Error(`Ator com id ${id} não encontrado.`);
    }
    return this.atoresRepository.update(id, updateAtoreDto);
  }

  remove(id: number) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('ID inválido.');
    }
    const ator = this.atoresRepository.findById(id);
    if (!ator) {
      throw new Error(`Ator com id ${id} não encontrado.`);
    }
    return this.atoresRepository.delete(id);
  }
}
