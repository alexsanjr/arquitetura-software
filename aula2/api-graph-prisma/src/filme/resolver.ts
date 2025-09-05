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
    },

    adicionarAtoresEmFilme: async (_: any, { filmeId, atorIds }: { filmeId: string; atorIds: string[] }) => {
      try {
        const atorIdsNum = atorIds.map(id => parseInt(id));
        return await filmeService.addAtoresEmFilme(parseInt(filmeId), atorIdsNum);
      } catch (error) {
        throw new Error(`Erro ao adicionar atores ao filme: ${error}`);
      }
    },

    removerAtorDeFilme: async (_: any, { filmeId, atorId }: { filmeId: string; atorId: string }) => {
      try {
        return await filmeService.removeAtorDeFilme(parseInt(filmeId), parseInt(atorId));
      } catch (error) {
        throw new Error(`Erro ao remover ator do filme: ${error}`);
      }
    },

    adicionarGenerosEmFilme: async (_: any, { filmeId, generoIds }: { filmeId: string; generoIds: string[] }) => {
      try {
        const generoIdsNum = generoIds.map(id => parseInt(id));
        return await filmeService.addGenerosEmFilme(parseInt(filmeId), generoIdsNum);
      } catch (error) {
        throw new Error(`Erro ao adicionar gêneros ao filme: ${error}`);
      }
    }
  }
};
