import { Injectable } from "@nestjs/common";
import { Filme } from "./filme.model";
import { InMemoryDatabase } from "src/database/db";

interface Data {
  titulo: string;
  anoDeLancamento: number;
}

interface UpdateData {
  titulo?: string;
  anoDeLancamento?: number;
}

@Injectable()
export class FilmeDataSource {
  private db = new InMemoryDatabase();

  findAll(): Filme[] {
    return this.db.filmesData;
  }

  findById(id: string): Filme | undefined {
    return this.db.filmesData.find(filme => filme.id === id);
  }

  create(data: Data): Filme {
    const newFilme: Filme = {
      id: String(this.db.filmesData.length + 1),
      titulo: data.titulo,
      anoDeLancamento: data.anoDeLancamento
    };
    this.db.filmesData.push(newFilme);
    return newFilme;
  }

  update(id: string, data: UpdateData): Filme | undefined {
    const filme = this.findById(id);
    if (!filme) {
      return undefined;
    }
    if (data.titulo !== undefined && data.titulo !== null) {
      filme.titulo = data.titulo;
    }
    if (data.anoDeLancamento !== undefined && data.anoDeLancamento !== null) {
      filme.anoDeLancamento = data.anoDeLancamento;
    }
    return filme;
  }

  remove(id: string): boolean {
    const index = this.db.filmesData.findIndex(filme => filme.id === id);
    if (index === -1) {
      return false;
    }
    this.db.filmesData.splice(index, 1);
    return true;
  }

  adicionarAtoresEmFilme(filmeId: string, atorIds: string[]): Filme | undefined {
    const filme = this.findById(filmeId);
    if (!filme) {
      throw new Error('Filme não encontrado');
    }

    // Verificar se os atores existem
    const atoresExistentes = this.db.atoresData;
    for (const atorId of atorIds) {
      const atorExiste = atoresExistentes.some(ator => ator.id === atorId);
      if (!atorExiste) {
        throw new Error(`Ator com id ${atorId} não encontrado`);
      }
    }

    // Adicionar relações na tabela filmesAtores
    const filmesAtores = this.db.filmesAtoresData;
    for (const atorId of atorIds) {
      // Verificar se a relação já existe
      const relacaoExiste = filmesAtores.some(
        fa => fa.filmeId === filmeId && fa.atorId === atorId
      );

      if (!relacaoExiste) {
        filmesAtores.push({
          filmeId: filmeId,
          atorId: atorId
        });
      }
    }

    return filme;
  }

  getAtoresDoFilme(filmeId: string): any[] {
    const filmesAtores = this.db.filmesAtoresData;
    const atorIds = filmesAtores
      .filter(fa => String(fa.filmeId) === filmeId)
      .map(fa => String(fa.atorId));

    const atores = this.db.atoresData;
    const atoresEncontrados = atores.filter(ator => atorIds.includes(String(ator.id)));

    return atoresEncontrados || [];
  }

  getGenerosDoFilme(filmeId: string): any[] {
    const filmeGeneros = this.db.filmeGenerosData;
    const generoIds = filmeGeneros
      .filter(fg => String(fg.filmeId) === filmeId)
      .map(fg => String(fg.generoId));

    const generos = this.db.generosData;
    const generosEncontrados = generos.filter(genero => generoIds.includes(String(genero.id)));

    return generosEncontrados || [];
  }

  adicionarGenerosAoFilme(filmeId: string, generoIds: string[]): Filme | undefined {
    const filme = this.findById(filmeId);
    if (!filme) {
      throw new Error('Filme não encontrado');
    }

    const generosExistentes = this.db.generosData;
    for (const generoId of generoIds) {
      const generoExiste = generosExistentes.some(genero => genero.id === generoId);
      if (!generoExiste) {
        throw new Error(`Gênero com id ${generoId} não encontrado`);
      }
    }
    const filmeGeneros = this.db.filmeGenerosData;
    for (const generoId of generoIds) {
      const relacaoExiste = filmeGeneros.some(
        fg => fg.filmeId === filmeId && fg.generoId === generoId
      );

      if (!relacaoExiste) {
        filmeGeneros.push({
          filmeId: filmeId,
          generoId: generoId
        });
      }
    }

    return filme;
  }

  removerAtorDeFilme(filmeId: string, atorId: string): Filme | undefined {
    const filme = this.findById(filmeId);
    if (!filme) {
      throw new Error('Filme não encontrado');
    }

    // Verificar se o ator existe
    const atorExiste = this.db.atoresData.some(ator => ator.id === atorId);
    if (!atorExiste) {
      throw new Error(`Ator com id ${atorId} não encontrado`);
    }

    // Remover relação da tabela filmesAtores
    const filmesAtores = this.db.filmesAtoresData;
    const index = filmesAtores.findIndex(
      fa => fa.filmeId === filmeId && fa.atorId === atorId
    );

    if (index === -1) {
      throw new Error('Ator não está associado a este filme');
    }

    filmesAtores.splice(index, 1);
    return filme;
  }
}
