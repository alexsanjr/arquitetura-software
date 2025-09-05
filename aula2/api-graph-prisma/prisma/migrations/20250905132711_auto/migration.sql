/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Ator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."Filme" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "anoDeLancamento" INTEGER NOT NULL,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_AtorToFilme" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AtorToFilme_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FilmeToGenero" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FilmeToGenero_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filme_titulo_key" ON "public"."Filme"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "public"."Genero"("nome");

-- CreateIndex
CREATE INDEX "_AtorToFilme_B_index" ON "public"."_AtorToFilme"("B");

-- CreateIndex
CREATE INDEX "_FilmeToGenero_B_index" ON "public"."_FilmeToGenero"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Ator_nome_key" ON "public"."Ator"("nome");

-- AddForeignKey
ALTER TABLE "public"."_AtorToFilme" ADD CONSTRAINT "_AtorToFilme_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Ator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AtorToFilme" ADD CONSTRAINT "_AtorToFilme_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FilmeToGenero" ADD CONSTRAINT "_FilmeToGenero_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Filme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FilmeToGenero" ADD CONSTRAINT "_FilmeToGenero_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
