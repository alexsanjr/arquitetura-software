import { PrismaClient } from "@prisma/client";

interface Data {
  nome: string;
  dataDeNascimento: number;
  nacionalidade: string
}

interface UpdateData {
  nome?: string;
  dataDeNascimento?: number;
  nacionalidade?: string;
}

const prisma = new PrismaClient();

export class AtorDatasource {

  async findAll() {
    return await prisma.ator.findMany();
  }

  async findById(id: number) {
    return await prisma.ator.findUnique({
      where: { id }
    });
  }

  async create(data: Data) {
    return await prisma.ator.create({
      data
    });
  }

  async update(id: number, data: UpdateData) {
    return await prisma.ator.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await prisma.ator.delete({
      where: { id }
    });
  }
}