import { FilmeService } from "./Service.js";
import { FilmeDatasource } from "./Datasource.js";

const filmeDatasource = new FilmeDatasource();
const filmeService = new FilmeService(filmeDatasource);

export class FilmeImplementation {

  async getAllFilmes(call: any, callback: any) {
    try {
      const result = await filmeService.getAllFilmes();

      callback(null, {
        success: result.success,
        message: result.message,
        filmes: result.filmes,
        total: result.total
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        filmes: [],
        total: 0
      });
    }
  }

  async getFilmeById(call: any, callback: any) {
    try {
      const { id } = call.request;
      const result = await filmeService.getFilmeById(id);

      callback(null, {
        success: result.success,
        message: result.message,
        filme: result.filme
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        filme: null
      });
    }
  }

  async createFilme(call: any, callback: any) {
    try {
      const { titulo, anoDeLancamento } = call.request;
      const result = await filmeService.createFilme({ titulo, anoDeLancamento });

      callback(null, {
        success: result.success,
        message: result.message,
        filme: result.filme
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        filme: null
      });
    }
  }

  async updateFilme(call: any, callback: any) {
    try {
      const { id, titulo, anoDeLancamento } = call.request;

      const updateData: any = {};
      if (titulo !== undefined && titulo !== "") updateData.titulo = titulo;
      if (anoDeLancamento !== undefined && anoDeLancamento !== 0) updateData.anoDeLancamento = anoDeLancamento;

      const result = await filmeService.updateFilme(id, updateData);

      callback(null, {
        success: result.success,
        message: result.message,
        filme: result.filme
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        filme: null
      });
    }
  }

  async deleteFilme(call: any, callback: any) {
    try {
      const { id } = call.request;
      const result = await filmeService.deleteFilme(id);

      callback(null, {
        success: result.success,
        message: result.message
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`
      });
    }
  }

  async getAtoresDoFilme(call: any, callback: any) {
    try {
      const { filmeId } = call.request;
      const result = await filmeService.getAtoresDoFilme(filmeId);

      callback(null, {
        success: result.success,
        message: result.message,
        atores: result.atores,
        total: result.total
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        atores: [],
        total: 0
      });
    }
  }

  async addAtorToFilme(call: any, callback: any) {
    try {
      const { filmeId, atorId } = call.request;
      const result = await filmeService.addAtorToFilme(filmeId, atorId);

      callback(null, {
        success: result.success,
        message: result.message
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`
      });
    }
  }
}

export const filmeImplementation = new FilmeImplementation();
