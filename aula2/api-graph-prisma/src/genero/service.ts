import { GeneroDatasource } from "./datasource.js";

interface CreateGeneroData {
  nome: string;
}

interface UpdateGeneroData {
  nome?: string;
}

export class GeneroService {
  private datasource: GeneroDatasource;

  constructor() {
    this.datasource = new GeneroDatasource();
  }

  async getAllGeneros() {
    try {
      return await this.datasource.findAll();
    } catch (error) {
      throw new Error(`Erro ao buscar gêneros: ${error}`);
    }
  }

  async getGeneroById(id: number) {
    try {
      const genero = await this.datasource.findById(id);
      if (!genero) {
        throw new Error(`Gênero com ID ${id} não encontrado`);
      }
      return genero;
    } catch (error) {
      throw new Error(`Erro ao buscar gênero: ${error}`);
    }
  }

  async createGenero(data: CreateGeneroData) {
    try {
      if (!data.nome || data.nome.trim().length === 0) {
        throw new Error("Nome do gênero é obrigatório");
      }

      return await this.datasource.create(data);
    } catch (error) {
      throw new Error(`Erro ao criar gênero: ${error}`);
    }
  }
}
