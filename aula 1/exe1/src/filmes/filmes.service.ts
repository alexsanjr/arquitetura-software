/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { FilmesRepository } from './filmes.repository';

import { Filme } from "./entities/filme.entity";
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmesService {

  constructor(private filmesRepository: FilmesRepository) { }

  findAll(): Filme[] {
    return this.filmesRepository.findAll();
  }

  findById(id: number) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('ID inválido.');
    }
    const filme = this.filmesRepository.findById(id);
    if (!filme) {
      throw new Error(`Filme com id ${id} não encontrado.`);
    }
    return filme;
  }

  create(createFilmeDto: CreateFilmeDto) {
    if (!createFilmeDto || typeof createFilmeDto !== 'object') {
      throw new Error('Dados para criação inválidos.');
    }
    const requiredFields = ['titulo', 'anoDeLancamento', 'generoId'];
    for (const field of requiredFields) {
      if (!createFilmeDto[field]) {
        throw new Error(`Campo obrigatório ausente: ${field}`);
      }
    }
    return this.filmesRepository.create(createFilmeDto);
  }

  update(id: number, updateFilmeDto: UpdateFilmeDto) {
    if (!updateFilmeDto || typeof updateFilmeDto !== 'object') {
      throw new Error('Dados para atualização inválidos.');
    }
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('ID inválido.');
    }
    const filme = this.filmesRepository.findById(id);
    if (!filme) {
      throw new Error(`Filme com id ${id} não encontrado.`);
    }
    return this.filmesRepository.update(id, updateFilmeDto);
  }

  remove(id: number) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new Error('ID inválido.');
    }
    const filme = this.filmesRepository.findById(id);
    if (!filme) {
      throw new Error(`Filme com id ${id} não encontrado.`);
    }
    return this.filmesRepository.delete(id);
  }

  getAtoresByFilmeId(filmeId: number) {
    if (typeof filmeId !== 'number' || isNaN(filmeId)) {
      throw new Error('ID do filme inválido.');
    }

    const filme = this.filmesRepository.findById(filmeId);
    if (!filme) {
      throw new Error(`Filme com id ${filmeId} não encontrado.`);
    }

    return this.filmesRepository.getAtoresByFilmeId(filmeId);
  }

  addAtorToFilme(filmeId: number, atorId: number) {
    if (typeof filmeId !== 'number' || isNaN(filmeId)) {
      throw new Error('ID do filme inválido.');
    }
    if (typeof atorId !== 'number' || isNaN(atorId)) {
      throw new Error('ID do ator inválido.');
    }

    return this.filmesRepository.addAtorToFilme(filmeId, atorId);
  }
}
