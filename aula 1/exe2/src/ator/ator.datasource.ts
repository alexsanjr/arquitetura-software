import { Injectable } from '@nestjs/common';
import { Ator } from './ator.model';
import { InMemoryDatabase } from '../database/db';

interface Data {
  nome: string;
  dataDeNascimento: number;
  nacionalidade: string
}

interface UpdateData {
  nome?: string;
  dataDeNascimento?: number;
  nacionalidade?: string;
}

@Injectable()
export class AtorDataSource {
  private db = new InMemoryDatabase();


  findAll(): Ator[] {
    return this.db.atoresData;
  }

  findById(id: string): Ator | undefined {
    return this.db.atoresData.find((a: any) => a.id === id);
  }

  create(data: Data): Ator {
    const atores = this.db.atoresData;
    const novo = {
      id: (atores.length + 1).toString(),
      ...data,
    };
    atores.push(novo);
    return novo;
  }

  update(id: string, data: UpdateData): Ator | undefined {
    const ator = this.findById(id);
    if (!ator) {
      return undefined;
    }
    if (data.nome !== undefined && data.nome !== null) {
      ator.nome = data.nome;
    }
    if (data.dataDeNascimento !== undefined && data.dataDeNascimento !== null) {
      ator.dataDeNascimento = data.dataDeNascimento;
    }
    if (data.nacionalidade !== undefined && data.nacionalidade !== null) {
      ator.nacionalidade = data.nacionalidade;
    }
    return ator;
  }

  remove(id: string): boolean {
    const index = this.db.atoresData.findIndex(ator => ator.id === id);
    if (index === -1) {
      return false;
    }
    this.db.atoresData.splice(index, 1);
    return true;
  }
}