export declare const typeDefs = "#graphql\n  type Ator {\n    id: ID!\n    nome: String!\n    dataDeNascimento: Int!\n    nacionalidade: String!\n  }\n\n  type Query {\n    atores: [Ator!]!\n    ator(id: ID!): Ator\n  }\n";
export declare const atores: {
    id: string;
    nome: string;
    dataDeNascimento: number;
    nacionalidade: string;
}[];
//# sourceMappingURL=typeDefs.d.ts.map