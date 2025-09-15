import { AtorService } from "./Service.js";
import { AtorDatasource } from "./Datasource.js";

const atorDatasource = new AtorDatasource();
const atorService = new AtorService(atorDatasource);

export class AtorImplementation {

  async getAllAtores(call: any, callback: any) {
    try {
      const result = await atorService.getAllAtores();

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

  async getAtorById(call: any, callback: any) {
    try {
      const { id } = call.request;
      const result = await atorService.getAtorById(id);

      callback(null, {
        success: result.success,
        message: result.message,
        ator: result.ator
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        ator: null
      });
    }
  }

  async createAtor(call: any, callback: any) {
    try {
      const { nome, dataDeNascimento, nacionalidade } = call.request;
      const result = await atorService.createAtor({ nome, dataDeNascimento, nacionalidade });

      callback(null, {
        success: result.success,
        message: result.message,
        ator: result.ator
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        ator: null
      });
    }
  }

  async updateAtor(call: any, callback: any) {
    try {
      const { id, nome, dataDeNascimento, nacionalidade } = call.request;

      const updateData: any = {};
      if (nome !== undefined && nome !== "") updateData.nome = nome;
      if (dataDeNascimento !== undefined && dataDeNascimento !== 0) updateData.dataDeNascimento = dataDeNascimento;
      if (nacionalidade !== undefined && nacionalidade !== "") updateData.nacionalidade = nacionalidade;

      const result = await atorService.updateAtor(id, updateData);

      callback(null, {
        success: result.success,
        message: result.message,
        ator: result.ator
      });
    } catch (error) {
      callback(null, {
        success: false,
        message: `Erro interno do servidor: ${(error as Error).message}`,
        ator: null
      });
    }
  }

  async deleteAtor(call: any, callback: any) {
    try {
      const { id } = call.request;
      const result = await atorService.deleteAtor(id);

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

export const atorImplementation = new AtorImplementation();
