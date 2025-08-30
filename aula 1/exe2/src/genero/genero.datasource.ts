import { Injectable } from "@nestjs/common";
import { InMemoryDatabase } from "src/database/db";
import { Genero } from "./genero.model";

@Injectable()
export class GeneroDataSource {
  private db = new InMemoryDatabase();

  findAll(): Genero[] {
    return this.db.generosData;
  }

  findById(id: string): Genero | undefined {
    return this.db.generosData.find((g: Genero) => g.id === id);
  }

  create(data: { nome: string }): Genero {
    const newGenero: Genero = {
      id: String(this.db.generosData.length + 1),
      nome: data.nome
    };
    this.db.generosData.push(newGenero);
    return newGenero;
  }
}