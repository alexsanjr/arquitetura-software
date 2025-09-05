-- CreateTable
CREATE TABLE "public"."Ator" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataDeNascimento" INTEGER NOT NULL,
    "nacionalidade" TEXT NOT NULL,

    CONSTRAINT "Ator_pkey" PRIMARY KEY ("id")
);
