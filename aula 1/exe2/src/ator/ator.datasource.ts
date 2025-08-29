import { Injectable } from '@nestjs/common';
import { Ator } from './ator.model';
import { InMemoryDatabase } from '../database/db';

@Injectable()
export class AtorDataSource {
  private db = new InMemoryDatabase();


  findAll(): Ator[] {
    return this.db['atores'];
  }


  findById(id: string): Ator | undefined {
    return this.db['atores'].find((a: any) => a.id === id);
  }

  create(data: { nome: string; dataDeNascimento: number; nacionalidade: string }): Ator {
    const atores = this.db['atores'];
    const novo = {
      id: (atores.length + 1).toString(),
      ...data,
    };
    atores.push(novo);
    return novo;
  }
}