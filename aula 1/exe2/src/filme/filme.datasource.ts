import { Injectable } from "@nestjs/common";
import { Filme } from "./filme.model";
import { InMemoryDatabase } from "src/database/db";

@Injectable()
export class FilmeDataSource {
  private db = new InMemoryDatabase();

  findAll(): Filme[] {
    return this.db['filmes'];
  }

  findById(id: string): Filme | undefined {
    return this.db['filmes'].find(filme => filme.id === id);
  }

  create(data: { titulo: string, anoDeLancamento: number }): Filme {
    const newFilme: Filme = {
      id: String(this.db['filmes'].length + 1),
      titulo: data.titulo,
      anoDeLancamento: data.anoDeLancamento
    };
    this.db['filmes'].push(newFilme);
    return newFilme;
  }
}
