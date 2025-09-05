import { AtorService } from "./service.js";

interface CreateAtorArgs {
  nome: string;
  dataDeNascimento: number;
  nacionalidade: string;
}

interface UpdateAtorArgs {
  id: string;
  nome?: string;
  dataDeNascimento?: number;
  nacionalidade?: string;
}

interface GetAtorArgs {
  id: string;
}

interface DeleteAtorArgs {
  id: string;
}

const atorService = new AtorService();

export const atorResolvers = {
  Query: {
    atores: async () => {
      try {
        return await atorService.getAllAtores();
      } catch (error) {
        throw new Error(`Erro ao buscar atores: ${error}`);
      }
    },

    ator: async (_: any, { id }: GetAtorArgs) => {
      try {
        return await atorService.getAtorById(parseInt(id));
      } catch (error) {
        throw new Error(`Erro ao buscar ator: ${error}`);
      }
    }
  },

  Mutation: {
    criarAtor: async (_: any, { nome, dataDeNascimento, nacionalidade }: CreateAtorArgs) => {
      try {
        return await atorService.createAtor({
          nome,
          dataDeNascimento,
          nacionalidade
        });
      } catch (error) {
        throw new Error(`Erro ao criar ator: ${error}`);
      }
    },

    atualizarAtor: async (_: any, { id, ...updateData }: UpdateAtorArgs) => {
      try {
        const updatePayload = {
          ...(updateData.nome !== undefined && { nome: updateData.nome }),
          ...(updateData.dataDeNascimento !== undefined && { dataDeNascimento: updateData.dataDeNascimento }),
          ...(updateData.nacionalidade !== undefined && { nacionalidade: updateData.nacionalidade })
        };

        return await atorService.updateAtor(parseInt(id), updatePayload);
      } catch (error) {
        throw new Error(`Erro ao atualizar ator: ${error}`);
      }
    },

    removerAtor: async (_: any, { id }: DeleteAtorArgs) => {
      try {
        await atorService.deleteAtor(parseInt(id));
        return true;
      } catch (error) {
        throw new Error(`Erro ao deletar ator: ${error}`);
      }
    }
  }
};
