import { GeneroService } from "./Service.js";
import { GeneroDatasource } from "./Datasource.js";

const generoDatasource = new GeneroDatasource();
const generoService = new GeneroService(generoDatasource);

export class GeneroImplementation {

  async getAllGeneros(call: any, callback: any) {
    try {
      const result = await generoService.getAllGeneros();

      callback(null, {
        success: result.success,
        message: result.message,
        generos: result.generos,
        total: result.total
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        generos: [],
        total: 0
      });
    }
  }

  async getGeneroById(call: any, callback: any) {
    try {
      const { id } = call.request;
      const result = await generoService.getGeneroById(id);

      callback(null, {
        success: result.success,
        message: result.message,
        genero: result.genero
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        genero: null
      });
    }
  }

  async createGenero(call: any, callback: any) {
    try {
      const { nome } = call.request;
      const result = await generoService.createGenero({ nome });

      callback(null, {
        success: result.success,
        message: result.message,
        genero: result.genero
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        genero: null
      });
    }
  }

  async updateGenero(call: any, callback: any) {
    try {
      const { id, nome } = call.request;

      const updateData: any = {};
      if (nome !== undefined && nome !== "") updateData.nome = nome;

      const result = await generoService.updateGenero(id, updateData);

      callback(null, {
        success: result.success,
        message: result.message,
        genero: result.genero
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        genero: null
      });
    }
  }

  async deleteGenero(call: any, callback: any) {
    try {
      const { id } = call.request;
      const result = await generoService.deleteGenero(id);

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

export const generoImplementation = new GeneroImplementation();
