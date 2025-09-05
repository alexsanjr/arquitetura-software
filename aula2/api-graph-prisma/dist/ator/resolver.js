import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const atorResolvers = {
    Query: {
        atores: async () => {
            return await prisma.ator.findMany();
        },
        ator: async (_, { id }) => {
            return await prisma.ator.findUnique({
                where: { id: parseInt(id) }
            });
        }
    },
    // Mutations futuras podem ser adicionadas aqui
    // Mutation: {
    //   criarAtor: async (_: any, { input }: { input: any }) => {
    //     return await prisma.ator.create({ data: input });
    //   }
    // }
};
//# sourceMappingURL=resolver.js.map