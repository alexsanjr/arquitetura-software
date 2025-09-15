import { AtorDatasource } from "./Datasource.js";
import type { Ator } from "../database/db.js";

export class AtorService {
  private datasource: AtorDatasource;

  constructor(datasource: AtorDatasource) {
    this.datasource = datasource;
  }

  async getAllAtores(): Promise<{ success: boolean; message: string; atores: Ator[]; total: number }> {
    try {
      const atores = this.datasource.findAll();
      return {
        success: true,
        message: "Atores encontrados com sucesso",
        atores,
        total: atores.length
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar atores: ${(error as Error).message}`,
        atores: [],
        total: 0
      };
    }
  }

  async getAtorById(id: string): Promise<{ success: boolean; message: string; ator: Ator | null }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do ator é obrigatório",
          ator: null
        };
      }

      const ator = this.datasource.findById(id);

      if (!ator) {
        return {
          success: false,
          message: `Ator com ID '${id}' não encontrado`,
          ator: null
        };
      }

      return {
        success: true,
        message: "Ator encontrado com sucesso",
        ator
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao buscar ator: ${(error as Error).message}`,
        ator: null
      };
    }
  }

  async createAtor(atorData: { nome: string; dataDeNascimento: number; nacionalidade: string }): Promise<{ success: boolean; message: string; ator: Ator | null }> {
    try {
      if (!atorData.nome || atorData.nome.trim() === "") {
        return {
          success: false,
          message: "Nome do ator é obrigatório",
          ator: null
        };
      }

      if (!atorData.nacionalidade || atorData.nacionalidade.trim() === "") {
        return {
          success: false,
          message: "Nacionalidade do ator é obrigatória",
          ator: null
        };
      }

      if (!atorData.dataDeNascimento || atorData.dataDeNascimento < 1900 || atorData.dataDeNascimento > new Date().getFullYear()) {
        return {
          success: false,
          message: "Data de nascimento deve ser um ano válido entre 1900 e o ano atual",
          ator: null
        };
      }

      const novoAtor = this.datasource.create(atorData);

      return {
        success: true,
        message: "Ator criado com sucesso",
        ator: novoAtor
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao criar ator: ${(error as Error).message}`,
        ator: null
      };
    }
  }

  async updateAtor(id: string, atorData: { nome?: string; dataDeNascimento?: number; nacionalidade?: string }): Promise<{ success: boolean; message: string; ator: Ator | null }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do ator é obrigatório",
          ator: null
        };
      }

      if (!this.datasource.exists(id)) {
        return {
          success: false,
          message: `Ator com ID '${id}' não encontrado`,
          ator: null
        };
      }

      if (atorData.nome !== undefined && atorData.nome.trim() === "") {
        return {
          success: false,
          message: "Nome não pode ser vazio",
          ator: null
        };
      }

      if (atorData.nacionalidade !== undefined && atorData.nacionalidade.trim() === "") {
        return {
          success: false,
          message: "Nacionalidade não pode ser vazia",
          ator: null
        };
      }

      if (atorData.dataDeNascimento !== undefined &&
        (atorData.dataDeNascimento < 1900 || atorData.dataDeNascimento > new Date().getFullYear())) {
        return {
          success: false,
          message: "Data de nascimento deve ser um ano válido entre 1900 e o ano atual",
          ator: null
        };
      }

      const atorAtualizado = this.datasource.update(id, atorData);

      if (!atorAtualizado) {
        return {
          success: false,
          message: "Erro ao atualizar ator",
          ator: null
        };
      }

      return {
        success: true,
        message: "Ator atualizado com sucesso",
        ator: atorAtualizado
      };
    } catch (error) {
      return {
        success: false,
        message: `Erro ao atualizar ator: ${(error as Error).message}`,
        ator: null
      };
    }
  }

  async deleteAtor(id: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!id || id.trim() === "") {
        return {
          success: false,
          message: "ID do ator é obrigatório"
        };
      }

      if (!this.datasource.exists(id)) {
        return {
          success: false,
          message: `Ator com ID '${id}' não encontrado`
        };
      }

      const sucesso = this.datasource.delete(id);

      if (sucesso) {
        return {
          success: true,
          message: "Ator deletado com sucesso"
        };
      } else {
        return {
          success: false,
          message: "Erro ao deletar ator"
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Erro ao deletar ator: ${(error as Error).message}`
      };
    }
  }

}
