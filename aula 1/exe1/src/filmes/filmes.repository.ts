/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";

import { InMemoryDatabase } from "src/database/db";
import { Filme } from "./entities/filme.entity";
import { CreateFilmeDto } from "./dto/create-filme.dto";

@Injectable()
export class FilmesRepository {

  private db = new InMemoryDatabase();

  findAll(): Filme[] {
    return this.db['filmes'];
  }

  findById(id: number): Filme | undefined {
    return this.db['filmes'].find(filme => filme.id === id);
  }

  create(createFilmeDto: CreateFilmeDto): Filme {
    const novoId = this.db['filmes'].length > 0 ? Math.max(...this.db['filmes'].map((f: Filme) => f.id)) + 1 : 1;
    const genero = this.db['generos'].find(genero => genero.id === createFilmeDto.generoId);
    if (!genero) {
      throw new Error(`Gênero com id ${createFilmeDto.generoId} não encontrado.`);
    }
    const filme = { id: novoId, titulo: createFilmeDto.titulo, anoDeLancamento: createFilmeDto.anoDeLancamento, genero: genero };
    this.db['filmes'].push(filme);
    return filme;
  }

  update(id: number, updateFilmeDto: Partial<Filme>): Filme | undefined {
    const filme = this.findById(id);
    if (!filme) return undefined;
    Object.assign(filme, updateFilmeDto);
    return filme;
  }

  delete(id: number): boolean {
    const index = this.db['filmes'].findIndex(filme => filme.id === id);
    if (index === -1) {
      return false;
    }
    this.db['filmes'].splice(index, 1);
    return true;
  }

  getAtoresByFilmeId(filmeId: number) {
    const atorIds = this.db['filmesAtores']
      .filter(fa => fa.filmeId === filmeId)
      .map(fa => fa.atorId);

    return this.db['atores'].filter(ator => atorIds.includes(ator.id));
  }

  addAtorToFilme(filmeId: number, atorId: number): boolean {
    const filme = this.findById(filmeId);
    if (!filme) {
      throw new Error(`Filme com id ${filmeId} não encontrado.`);
    }

    const ator = this.db['atores'].find(a => a.id === atorId);
    if (!ator) {
      throw new Error(`Ator com id ${atorId} não encontrado.`);
    }

    const relacionamentoExiste = this.db['filmesAtores'].some(
      fa => fa.filmeId === filmeId && fa.atorId === atorId
    );
    if (relacionamentoExiste) {
      throw new Error(`Ator já está associado a este filme.`);
    }

    this.db['filmesAtores'].push({ filmeId, atorId });
    return true;
  }

}