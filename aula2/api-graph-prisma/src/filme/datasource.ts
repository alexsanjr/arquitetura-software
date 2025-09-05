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
    return await prisma.filme.findMany({
      include: {
        atores: true,
        generos: true
      }
    });
  }

  async findById(id: number) {
    return await prisma.filme.findUnique({
      where: { id },
      include: {
        atores: true,
        generos: true
      }
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

  async addAtoresEmFilme(filmeId: number, atorIds: number[]) {
    return await prisma.filme.update({
      where: { id: filmeId },
      data: {
        atores: {
          connect: atorIds.map(atorId => ({ id: atorId }))
        }
      },
      include: {
        atores: true,
        generos: true
      }
    });
  }
}