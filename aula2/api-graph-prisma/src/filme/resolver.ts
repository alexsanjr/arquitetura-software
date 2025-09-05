import { FilmeService } from "./service.js";

interface CreateFilmeArgs {
  titulo: string;
  anoDeLancamento: number;
}

interface UpdateFilmeArgs {
  id: string;
  titulo?: string;
  anoDeLancamento?: number;
}

interface GetFilmeArgs {
  id: string;
}

interface DeleteFilmeArgs {
  id: string;
}

const filmeService = new FilmeService();

export const filmeResolvers = {
  Query: {
    filmes: async () => {
      try {
        return await filmeService.getAllFilmes();
      } catch (error) {
        throw new Error(`Erro ao buscar filmes: ${error}`);
      }
    },

    filme: async (_: any, { id }: GetFilmeArgs) => {
      try {
        return await filmeService.getFilmeById(parseInt(id));
      } catch (error) {
        throw new Error(`Erro ao buscar filme: ${error}`);
      }
    }
  },

  Mutation: {
    criarFilme: async (_: any, { titulo, anoDeLancamento }: CreateFilmeArgs) => {
      try {
        return await filmeService.createFilme({
          titulo,
          anoDeLancamento
        });
      } catch (error) {
        throw new Error(`Erro ao criar filme: ${error}`);
      }
    },

    atualizarFilme: async (_: any, { id, ...updateData }: UpdateFilmeArgs) => {
      try {
        const updatePayload = {
          ...(updateData.titulo !== undefined && { titulo: updateData.titulo }),
          ...(updateData.anoDeLancamento !== undefined && { anoDeLancamento: updateData.anoDeLancamento })
        };

        return await filmeService.updateFilme(parseInt(id), updatePayload);
      } catch (error) {
        throw new Error(`Erro ao atualizar filme: ${error}`);
      }
    },

    removerFilme: async (_: any, { id }: DeleteFilmeArgs) => {
      try {
        await filmeService.deleteFilme(parseInt(id));
        return true;
      } catch (error) {
        throw new Error(`Erro ao deletar filme: ${error}`);
      }
    }
  }
};
