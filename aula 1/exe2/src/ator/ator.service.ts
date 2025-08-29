// src/ator/ator.service.ts

import { Injectable } from '@nestjs/common';
import { Ator } from './ator.model';
import { AtorDataSource } from './ator.datasource';

@Injectable()
export class AtorService {
  constructor(private readonly dataSource: AtorDataSource) { }

  findAll(): Ator[] {
    return this.dataSource.findAll();
  }

  findOne(id: string): Ator | undefined {
    return this.dataSource.findById(id);
  }

  create(data: { nome: string; dataDeNascimento: number; nacionalidade: string }): Ator {
    return this.dataSource.create(data);
  }
}