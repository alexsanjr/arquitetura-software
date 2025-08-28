/* eslint-disable prettier/prettier */
import { Ator } from "src/atores/entities/ator.entity";

interface Filme {
  id: number;
  titulo: string;
  anoDeLancamento: number;
  genero: Genero;
}

interface FilmeAtor {
  filmeId: number;
  atorId: number;
}

interface Genero {
  id: number;
  nome: string;
}

export class InMemoryDatabase {
  private generos: Genero[] = [
    {
      id: 1,
      nome: "Fantasia"
    },
    {
      id: 2,
      nome: "Ficção Científica"
    },
    {
      id: 3,
      nome: "Crime"
    }
  ];

  private filmes: Filme[] = [
    {
      id: 1,
      titulo: "O Senhor dos Anéis: A Sociedade do Anel",
      anoDeLancamento: 2001,
      genero: { id: 1, nome: "Fantasia" }
    },
    {
      id: 2,
      titulo: "Matrix",
      anoDeLancamento: 1999,
      genero: { id: 2, nome: "Ficção Científica" }
    },
    {
      id: 3,
      titulo: "Pulp Fiction",
      anoDeLancamento: 1994,
      genero: { id: 3, nome: "Crime" }
    }
  ];

  private atores: Ator[] = [
    {
      id: 1,
      nome: "Elijah Wood",
      dataDeNascimento: 1981,
      nacionalidade: "Americana"
    },
    {
      id: 2,
      nome: "Keanu Reeves",
      dataDeNascimento: 1964,
      nacionalidade: "Canadense"
    },
    {
      id: 3,
      nome: "John Travolta",
      dataDeNascimento: 1954,
      nacionalidade: "Americana"
    }
  ]

  private filmesAtores: FilmeAtor[] = [
    { filmeId: 1, atorId: 1 },
    { filmeId: 2, atorId: 2 },
    { filmeId: 3, atorId: 3 },
  ]
}