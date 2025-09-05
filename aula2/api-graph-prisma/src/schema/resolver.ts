import { atores } from "./typeDefs.js";

export const resolvers = {
  Query: {
    atores: () => {
      return atores.filter(ator => ator.dataDeNascimento);
    }
  },
};
