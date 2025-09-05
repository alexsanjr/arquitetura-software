import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs.js";
import { atorResolvers } from "./ator/resolver.js";
import { generoResolvers } from "./genero/resolver.js";
import { filmeResolvers } from "./filme/resolver.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: [atorResolvers, generoResolvers, filmeResolvers]
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);