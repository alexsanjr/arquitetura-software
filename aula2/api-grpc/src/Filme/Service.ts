import { FilmeDatasource } from "./Datasource.js";
import type { Filme, Ator } from "../database/db.js";

export class FilmeService {
  private datasource: FilmeDatasource;

  constructor(datasource: FilmeDatasource) {
    this.datasource = datasource;
  }

  async getAllFilmes(): Promise<{ success: boolean; message: string; filmes: Filme[]; total: number }> {
    try {
      const filmes = this.datasource.findAll();
      return {
        success: true,
        message: "Filmes encontrados com sucesso",
        filmes,
        total: filmes.length
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar filmes: ${(error as Error).message}`,
        filmes: [],
        total: 0
      };
    }
  }

  async getFilmeById(id: string): Promise<{ success: boolean; message: string; filme: Filme | null }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do filme é obrigatório",
          filme: null
        };
      }

      const filme = this.datasource.findById(id);

      if (!filme) {
        return {
          success: false,
          message: `Filme com ID '${id}' não encontrado`,
          filme: null
        };
      }

      return {
        success: true,
        message: "Filme encontrado com sucesso",
        filme
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar filme: ${(error as Error).message}`,
        filme: null
      };
    }
  }

  async createFilme(filmeData: { titulo: string; anoDeLancamento: number }): Promise<{ success: boolean; message: string; filme: Filme | null }> {
    try {
      if (!filmeData.titulo || filmeData.titulo.trim() === "") {
        return {
          success: false,
          message: "Título do filme é obrigatório",
          filme: null
        };
      }

      if (!filmeData.anoDeLancamento || filmeData.anoDeLancamento < 1800 || filmeData.anoDeLancamento > new Date().getFullYear() + 5) {
        return {
          success: false,
          message: "Ano de lançamento deve ser válido",
          filme: null
        };
      }

      const novoFilme = this.datasource.create(filmeData);

      return {
        success: true,
        message: "Filme criado com sucesso",
        filme: novoFilme
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao criar filme: ${(error as Error).message}`,
        filme: null
      };
    }
  }

  async updateFilme(id: string, filmeData: { titulo?: string; anoDeLancamento?: number }): Promise<{ success: boolean; message: string; filme: Filme | null }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do filme é obrigatório",
          filme: null
        };
      }

      if (!this.datasource.exists(id)) {
        return {
          success: false,
          message: `Filme com ID '${id}' não encontrado`,
          filme: null
        };
      }

      if (filmeData.titulo !== undefined && filmeData.titulo.trim() === "") {
        return {
          success: false,
          message: "Título não pode ser vazio",
          filme: null
        };
      }

      if (filmeData.anoDeLancamento !== undefined &&
        (filmeData.anoDeLancamento < 1800 || filmeData.anoDeLancamento > new Date().getFullYear() + 5)) {
        return {
          success: false,
          message: "Ano de lançamento deve ser válido",
          filme: null
        };
      }

      const filmeAtualizado = this.datasource.update(id, filmeData);

      if (!filmeAtualizado) {
        return {
          success: false,
          message: "Erro ao atualizar filme",
          filme: null
        };
      }

      return {
        success: true,
        message: "Filme atualizado com sucesso",
        filme: filmeAtualizado
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao atualizar filme: ${(error as Error).message}`,
        filme: null
      };
    }
  }

  async deleteFilme(id: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do filme é obrigatório"
        };
      }

      if (!this.datasource.exists(id)) {
        return {
          success: false,
          message: `Filme com ID '${id}' não encontrado`
        };
      }

      const sucesso = this.datasource.delete(id);

      if (sucesso) {
        return {
          success: true,
          message: "Filme deletado com sucesso"
        };
      } else {
        return {
          success: false,
          message: "Erro ao deletar filme"
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Erro ao deletar filme: ${(error as Error).message}`
      };
    }
  }

  async getAtoresDoFilme(filmeId: string): Promise<{ success: boolean; message: string; atores: Ator[]; total: number }> {
    try {
      if (!filmeId || filmeId.trim() === "") {
        return {
          success: false,
          message: "ID do filme é obrigatório",
          atores: [],
          total: 0
        };
      }

      if (!this.datasource.exists(filmeId)) {
        return {
          success: false,
          message: `Filme com ID '${filmeId}' não encontrado`,
          atores: [],
          total: 0
        };
      }

      const atores = this.datasource.getAtoresByFilmeId(filmeId);

      return {
        success: true,
        message: atores.length > 0 ? "Atores encontrados com sucesso" : "Nenhum ator encontrado para este filme",
        atores,
        total: atores.length
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar atores do filme: ${(error as Error).message}`,
        atores: [],
        total: 0
      };
    }
  }

  async addAtorToFilme(filmeId: string, atorId: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!filmeId || filmeId.trim() === "") {
        return {
          success: false,
          message: "ID do filme é obrigatório"
        };
      }

      if (!atorId || atorId.trim() === "") {
        return {
          success: false,
          message: "ID do ator é obrigatório"
        };
      }

      const sucesso = this.datasource.addAtorToFilme(filmeId, atorId);

      if (sucesso) {
        return {
          success: true,
          message: "Ator adicionado ao filme com sucesso"
        };
      } else {
        return {
          success: false,
          message: "Erro ao adicionar ator ao filme (filme ou ator não encontrado, ou associação já existe)"
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Erro ao adicionar ator ao filme: ${(error as Error).message}`
      };
    }
  }
}
