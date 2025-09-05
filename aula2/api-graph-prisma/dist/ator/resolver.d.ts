export declare const atorResolvers: {
    Query: {
        atores: () => Promise<{
            id: number;
            nome: string;
            dataDeNascimento: number;
            nacionalidade: string;
        }[]>;
        ator: (_: any, { id }: {
            id: string;
        }) => Promise<{
            id: number;
            nome: string;
            dataDeNascimento: number;
            nacionalidade: string;
        } | null>;
    };
};
//# sourceMappingURL=resolver.d.ts.map