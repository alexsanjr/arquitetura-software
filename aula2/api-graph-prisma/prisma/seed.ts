import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  await prisma.ator.deleteMany({})
  await prisma.$executeRaw`ALTER SEQUENCE "Ator_id_seq" RESTART WITH 1`

  await prisma.filme.deleteMany({})
  await prisma.$executeRaw`ALTER SEQUENCE "Filme_id_seq" RESTART WITH 1`

  await prisma.genero.deleteMany({})
  await prisma.$executeRaw`ALTER SEQUENCE "Genero_id_seq" RESTART WITH 1`

  const generos = await prisma.genero.createManyAndReturn({
    data: [
      { nome: "Ação" },
      { nome: "Drama" },
      { nome: "Ficção Científica" }
    ],
  })
  console.log('Gêneros criados:', generos)

  const atores = await prisma.ator.createManyAndReturn({
    data: [
      {
        nome: "Elijah Wood",
        dataDeNascimento: 1981,
        nacionalidade: "Americana"
      },
      {
        nome: "Keanu Reeves",
        dataDeNascimento: 1964,
        nacionalidade: "Canadense"
      },
      {
        nome: "John Travolta",
        dataDeNascimento: 1954,
        nacionalidade: "Americana"
      }
    ],
  })
  console.log('Atores criados:', atores)

  const filme1 = await prisma.filme.create({
    data: {
      titulo: "Matrix",
      anoDeLancamento: 1999,
      generos: {
        connect: [{ id: 1 }, { id: 3 }]
      },
      atores: {
        connect: [{ id: 2 }]
      }
    }
  })

  const filme2 = await prisma.filme.create({
    data: {
      titulo: "O Senhor dos Anéis",
      anoDeLancamento: 2001,
      generos: {
        connect: [{ id: 1 }, { id: 2 }]
      },
      atores: {
        connect: [{ id: 1 }]
      }
    }
  })

  const filme3 = await prisma.filme.create({
    data: {
      titulo: "Pulp Fiction",
      anoDeLancamento: 1994,
      generos: {
        connect: [{ id: 2 }]
      },
      atores: {
        connect: [{ id: 3 }]
      }
    }
  })

  console.log('Filmes criados:', [filme1, filme2, filme3])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })