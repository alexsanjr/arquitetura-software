import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.ator.deleteMany({})
  await prisma.$executeRaw`ALTER SEQUENCE "Ator_id_seq" RESTART WITH 1`

  await prisma.ator.createMany({
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

  const atores = await prisma.ator.findMany()
  console.log(atores)
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