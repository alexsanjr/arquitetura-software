import { GeneroService } from "./service.js";

interface CreateGeneroArgs {
  nome: string;
}
interface UpdateGeneroArgs {
  id: string;
  nome?: string;
}

interface GetGeneroArgs {
  id: string;
}

interface DeleteGeneroArgs {
  id: string;
}

const generoService = new GeneroService();

export const generoResolvers = {
  Query: {
    generos: async () => {
      try {
        return await generoService.getAllGeneros();
      } catch (error) {
        throw new Error(`Erro ao buscar gêneros: ${error}`);
      }
    },

    genero: async (_: any, { id }: GetGeneroArgs) => {
      try {
        return await generoService.getGeneroById(parseInt(id));
      } catch (error) {
        throw new Error(`Erro ao buscar gênero: ${error}`);
      }
    }
  },

  Mutation: {
    criarGenero: async (_: any, { nome }: CreateGeneroArgs) => {
      try {
        return await generoService.createGenero({
          nome
        });
      } catch (error) {
        throw new Error(`Erro ao criar gênero: ${error}`);
      }
    },
  }
}
