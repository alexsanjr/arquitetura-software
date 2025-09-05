import { FilmeDatasource } from "./datasource.js";

interface CreateFilmeData {
  titulo: string;
  anoDeLancamento: number;
}

interface UpdateFilmeData {
  titulo?: string;
  anoDeLancamento?: number;
}

export class FilmeService {
  private datasource: FilmeDatasource;

  constructor() {
    this.datasource = new FilmeDatasource();
  }

  async getAllFilmes() {
    try {
      return await this.datasource.findAll();
    } catch (error) {
      throw new Error(`Erro ao buscar filmes: ${error}`);
    }
  }

  async getFilmeById(id: number) {
    try {
      const filme = await this.datasource.findById(id);
      if (!filme) {
        throw new Error(`Filme com ID ${id} não encontrado`);
      }
      return filme;
    } catch (error) {
      throw new Error(`Erro ao buscar filme: ${error}`);
    }
  }

  async createFilme(data: CreateFilmeData) {
    try {
      if (!data.titulo || data.titulo.trim().length === 0) {
        throw new Error("Título do filme é obrigatório");
      }

      if (!data.anoDeLancamento || data.anoDeLancamento <= 0) {
        throw new Error("Ano de lançamento do filme é obrigatório e deve ser positivo");
      }

      return await this.datasource.create(data);
    } catch (error) {
      throw new Error(`Erro ao criar filme: ${error}`);
    }
  }

  async updateFilme(id: number, data: UpdateFilmeData) {
    try {
      await this.getFilmeById(id);

      if (data.titulo !== undefined && data.titulo.trim().length === 0) {
        throw new Error("Título não pode ser vazio");
      }

      if (data.anoDeLancamento !== undefined && data.anoDeLancamento <= 0) {
        throw new Error("Ano de lançamento não pode ser vazio e deve ser positivo");
      }

      return await this.datasource.update(id, data);
    } catch (error) {
      throw new Error(`Erro ao atualizar filme: ${error}`);
    }
  }

  async deleteFilme(id: number) {
    try {
      await this.getFilmeById(id);

      return await this.datasource.delete(id);
    } catch (error) {
      throw new Error(`Erro ao deletar filme: ${error}`);
    }
  }
}
