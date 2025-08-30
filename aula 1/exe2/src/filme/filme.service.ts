import { Injectable } from "@nestjs/common";
import { FilmeDataSource } from "./filme.datasource";
import { Filme } from "./filme.model";

@Injectable()
export class FilmeService {
  constructor(private readonly filmeDataSource: FilmeDataSource) { }

  findAll(): Filme[] {
    return this.filmeDataSource.findAll();
  }

  findById(id: string): Filme | undefined {
    return this.filmeDataSource.findById(id);
  }

  create(data: { titulo: string, anoDeLancamento: number }): Filme {
    return this.filmeDataSource.create(data);
  }
}
