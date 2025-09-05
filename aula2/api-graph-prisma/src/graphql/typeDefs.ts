export const typeDefs = `#graphql
  type Ator {
    id: ID!
    nome: String!
    dataDeNascimento: Int!
    nacionalidade: String!
  }

  type Query {
    atores: [Ator!]!
    ator(id: ID!): Ator
  }
`;