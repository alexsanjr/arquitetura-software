import { Injectable } from "@nestjs/common";
import { Genero } from "./genero.model";
import { GeneroDataSource } from "./genero.datasource";

@Injectable()
export class GeneroService {
  constructor(private readonly dataSource: GeneroDataSource) { }

  findAll(): Genero[] {
    return this.dataSource.findAll();
  }

  findById(id: string): Genero | undefined {
    return this.dataSource.findById(id);
  }

  create(data: { nome: string }): Genero {
    return this.dataSource.create(data);
  }

}