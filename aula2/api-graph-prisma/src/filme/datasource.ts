import { PrismaClient } from "@prisma/client";

interface Data {
  titulo: string;
  anoDeLancamento: number;
}

interface UpdateData {
  titulo?: string;
  anoDeLancamento?: number;
}

const prisma = new PrismaClient();

export class FilmeDatasource {

  async findAll() {
    return await prisma.filme.findMany();
  }

  async findById(id: number) {
    return await prisma.filme.findUnique({
      where: { id }
    });
  }

  async create(data: Data) {
    return await prisma.filme.create({
      data
    });
  }

  async update(id: number, data: UpdateData) {
    return await prisma.filme.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await prisma.filme.delete({
      where: { id }
    });
  }
}