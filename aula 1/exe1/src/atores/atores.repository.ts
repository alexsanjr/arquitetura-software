/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InMemoryDatabase } from "src/database/db";
import { Ator } from "./entities/ator.entity";
import { CreateAtorDto } from './dto/create-ator.dto';

@Injectable()
export class AtoresRepository {
  private db = new InMemoryDatabase();

  findAll(): Ator[] {
    return this.db['atores'];
  }

  findById(id: number): Ator | undefined {
    return this.db['atores'].find((ator: Ator) => ator.id === id);
  }

  update(id: number, updateAtorDto: Partial<Ator>): Ator | undefined {
    const ator = this.findById(id);
    if (!ator) return undefined;
    Object.assign(ator, updateAtorDto);
    return ator;
  }

  create(createAtorDto: CreateAtorDto): Ator {
    const novoId = this.db['atores'].length > 0 ? Math.max(...this.db['atores'].map((a: Ator) => a.id)) + 1 : 1;
    const ator = { id: novoId, ...createAtorDto };
    this.db['atores'].push(ator);
    return ator;
  }

  delete(id: number): boolean {
    const index = this.db['atores'].findIndex((ator: Ator) => ator.id === id);
    if (index === -1) {
      return false;
    }
    this.db['atores'].splice(index, 1);
    return true;
  }
}