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
export const atores = [
    {
        id: "1",
        nome: "Elijah Wood",
        dataDeNascimento: 1981,
        nacionalidade: "Americana"
    },
    {
        id: "2",
        nome: "Keanu Reeves",
        dataDeNascimento: 1964,
        nacionalidade: "Canadense"
    },
    {
        id: "3",
        nome: "John Travolta",
        dataDeNascimento: 1954,
        nacionalidade: "Americana"
    }
];
//# sourceMappingURL=typeDefs.js.map