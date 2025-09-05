export const typeDefs = `#graphql
  type Ator {
    id: ID!
    nome: String!
    dataDeNascimento: Int!
    nacionalidade: String!
  }

  type Genero {
    id: ID!
    nome: String!
  }

  type Filme {
  id: ID!
  titulo: String!
  anoDeLancamento: Int!
  atores: [Ator!]
  generos: [Genero!]
}


  type Query {
    atores: [Ator!]!
    ator(id: ID!): Ator

    generos: [Genero!]!
    genero(id: ID!): Genero

    filmes: [Filme!]!
    filme(id: ID!): Filme
  }

  type Mutation {

    criarAtor(
      nome: String!
      dataDeNascimento: Int!
      nacionalidade: String!
    ): Ator!
     atualizarAtor(
      id: ID!
      nome: String
      dataDeNascimento: Int
      nacionalidade: String
    ): Ator!
    removerAtor(id: ID!): Boolean!

    criarGenero(nome: String!): Genero!

    criarFilme(titulo: String!, anoDeLancamento: Int!): Filme!
    atualizarFilme(id: ID!, titulo: String, anoDeLancamento: Int): Filme!
    removerFilme(id: ID!): Boolean!
    adicionarAtoresEmFilme(filmeId: ID!, atorIds: [ID!]!): Filme!
    removerAtorDeFilme(filmeId: ID!, atorId: ID!): Filme!
    adicionarGenerosEmFilme(filmeId: ID!, generoIds: [ID!]!): Filme!

  }
`;