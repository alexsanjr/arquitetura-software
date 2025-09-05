import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs.js";
import { atorResolvers } from "./ator/resolver.js";
import { generoResolvers } from "./genero/resolver.js";
import { filmeResolvers } from "./filme/resolver.js";

// Combinar todos os resolvers
const resolvers = {
  Query: {
    ...atorResolvers.Query,
    ...generoResolvers.Query,
    ...filmeResolvers.Query
  },
  Mutation: {
    ...atorResolvers.Mutation,
    ...generoResolvers.Mutation,
    ...filmeResolvers.Mutation
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);