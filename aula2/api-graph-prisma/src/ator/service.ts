import { AtorDatasource } from "./datasource.js";

interface CreateAtorData {
  nome: string;
  dataDeNascimento: number;
  nacionalidade: string;
}

interface UpdateAtorData {
  nome?: string;
  dataDeNascimento?: number;
  nacionalidade?: string;
}

export class AtorService {
  private datasource: AtorDatasource;

  constructor() {
    this.datasource = new AtorDatasource();
  }

  async getAllAtores() {
    try {
      return await this.datasource.findAll();
    } catch (error) {
      throw new Error(`Erro ao buscar atores: ${error}`);
    }
  }

  async getAtorById(id: number) {
    try {
      const ator = await this.datasource.findById(id);
      if (!ator) {
        throw new Error(`Ator com ID ${id} não encontrado`);
      }
      return ator;
    } catch (error) {
      throw new Error(`Erro ao buscar ator: ${error}`);
    }
  }

  async createAtor(data: CreateAtorData) {
    try {
      if (!data.nome || data.nome.trim().length === 0) {
        throw new Error("Nome do ator é obrigatório");
      }

      if (!data.nacionalidade || data.nacionalidade.trim().length === 0) {
        throw new Error("Nacionalidade do ator é obrigatória");
      }

      return await this.datasource.create(data);
    } catch (error) {
      throw new Error(`Erro ao criar ator: ${error}`);
    }
  }

  async updateAtor(id: number, data: UpdateAtorData) {
    try {
      await this.getAtorById(id);

      if (data.nome !== undefined && data.nome.trim().length === 0) {
        throw new Error("Nome não pode ser vazio");
      }

      if (data.nacionalidade !== undefined && data.nacionalidade.trim().length === 0) {
        throw new Error("Nacionalidade não pode ser vazia");
      }

      return await this.datasource.update(id, data);
    } catch (error) {
      throw new Error(`Erro ao atualizar ator: ${error}`);
    }
  }

  async deleteAtor(id: number) {
    try {
      await this.getAtorById(id);

      return await this.datasource.delete(id);
    } catch (error) {
      throw new Error(`Erro ao deletar ator: ${error}`);
    }
  }
}
