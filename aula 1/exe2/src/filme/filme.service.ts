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

  update(id: string, data: { titulo?: string, anoDeLancamento?: number }): Filme | undefined {

    return this.filmeDataSource.update(id, data);
  }

  remove(id: string): boolean {
    return this.filmeDataSource.remove(id);
  }

  adicionarAtoresEmFilme(filmeId: string, atorIds: string[]): Filme | undefined {
    return this.filmeDataSource.adicionarAtoresEmFilme(filmeId, atorIds);
  }

  getAtoresDoFilme(filmeId: string): any[] {
    return this.filmeDataSource.getAtoresDoFilme(filmeId);
  }

  removerAtorDeFilme(filmeId: string, atorId: string): Filme | undefined {
    return this.filmeDataSource.removerAtorDeFilme(filmeId, atorId);
  }

  adicionarGenerosAoFilme(filmeId: string, generoIds: string[]): Filme | undefined {
    return this.filmeDataSource.adicionarGenerosAoFilme(filmeId, generoIds);
  }

  getGenerosDoFilme(filmeId: string): any[] {
    return this.filmeDataSource.getGenerosDoFilme(filmeId);
  }
}
