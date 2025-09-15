import { GeneroDatasource } from "./Datasource.js";
import type { Genero, Filme } from "../database/db.js";

export class GeneroService {
  private datasource: GeneroDatasource;

  constructor(datasource: GeneroDatasource) {
    this.datasource = datasource;
  }

  async getAllGeneros(): Promise<{ success: boolean; message: string; generos: Genero[]; total: number }> {
    try {
      const generos = this.datasource.findAll();
      return {
        success: true,
        message: "Gêneros encontrados com sucesso",
        generos,
        total: generos.length
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar gêneros: ${(error as Error).message}`,
        generos: [],
        total: 0
      };
    }
  }

  async getGeneroById(id: string): Promise<{ success: boolean; message: string; genero: Genero | null }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do gênero é obrigatório",
          genero: null
        };
      }

      const genero = this.datasource.findById(id);

      if (!genero) {
        return {
          success: false,
          message: `Gênero com ID '${id}' não encontrado`,
          genero: null
        };
      }

      return {
        success: true,
        message: "Gênero encontrado com sucesso",
        genero
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar gênero: ${(error as Error).message}`,
        genero: null
      };
    }
  }

  async createGenero(generoData: { nome: string }): Promise<{ success: boolean; message: string; genero: Genero | null }> {
    try {
      if (!generoData.nome || generoData.nome.trim() === "") {
        return {
          success: false,
          message: "Nome do gênero é obrigatório",
          genero: null
        };
      }

      // Verifica se já existe um gênero com o mesmo nome
      const generoExistente = this.datasource.findAll().find(
        g => g.nome.toLowerCase() === generoData.nome.toLowerCase()
      );

      if (generoExistente) {
        return {
          success: false,
          message: "Já existe um gênero com este nome",
          genero: null
        };
      }

      const novoGenero = this.datasource.create(generoData);

      return {
        success: true,
        message: "Gênero criado com sucesso",
        genero: novoGenero
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao criar gênero: ${(error as Error).message}`,
        genero: null
      };
    }
  }

  async updateGenero(id: string, generoData: { nome?: string }): Promise<{ success: boolean; message: string; genero: Genero | null }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do gênero é obrigatório",
          genero: null
        };
      }

      if (!this.datasource.exists(id)) {
        return {
          success: false,
          message: `Gênero com ID '${id}' não encontrado`,
          genero: null
        };
      }

      if (generoData.nome !== undefined && generoData.nome.trim() === "") {
        return {
          success: false,
          message: "Nome não pode ser vazio",
          genero: null
        };
      }

      // Verifica se já existe outro gênero com o mesmo nome
      if (generoData.nome) {
        const generoExistente = this.datasource.findAll().find(
          g => g.nome.toLowerCase() === generoData.nome!.toLowerCase() && g.id !== id
        );

        if (generoExistente) {
          return {
            success: false,
            message: "Já existe outro gênero com este nome",
            genero: null
          };
        }
      }

      const generoAtualizado = this.datasource.update(id, generoData);

      if (!generoAtualizado) {
        return {
          success: false,
          message: "Erro ao atualizar gênero",
          genero: null
        };
      }

      return {
        success: true,
        message: "Gênero atualizado com sucesso",
        genero: generoAtualizado
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao atualizar gênero: ${(error as Error).message}`,
        genero: null
      };
    }
  }

  async deleteGenero(id: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do gênero é obrigatório"
        };
      }

      if (!this.datasource.exists(id)) {
        return {
          success: false,
          message: `Gênero com ID '${id}' não encontrado`
        };
      }

      // Verifica se há filmes associados ao gênero
      const filmesAssociados = this.datasource.getFilmesByGeneroId(id);
      if (filmesAssociados.length > 0) {
        return {
          success: false,
          message: `Não é possível deletar o gênero pois existem ${filmesAssociados.length} filme(s) associado(s)`
        };
      }

      const sucesso = this.datasource.delete(id);

      if (sucesso) {
        return {
          success: true,
          message: "Gênero deletado com sucesso"
        };
      } else {
        return {
          success: false,
          message: "Erro ao deletar gênero"
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Erro ao deletar gênero: ${(error as Error).message}`
      };
    }
  }
}
