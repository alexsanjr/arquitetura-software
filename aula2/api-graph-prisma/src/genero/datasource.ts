import { PrismaClient } from "@prisma/client";

interface Data {
  nome: string;
}

const prisma = new PrismaClient();

export class GeneroDatasource {

  async findAll() {
    return await prisma.genero.findMany();
  }

  async findById(id: number) {
    return await prisma.genero.findUnique({
      where: { id }
    });
  }

  async create(data: Data) {
    return await prisma.genero.create({
      data
    });
  }
}