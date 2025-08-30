
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Ator {
    id: string;
    nome: string;
    dataDeNascimento: number;
    nacionalidade: string;
}

export class Genero {
    id: string;
    nome: string;
}

export class Filme {
    id: string;
    titulo: string;
    anoDeLancamento: number;
}

export abstract class IQuery {
    abstract atores(): Ator[] | Promise<Ator[]>;

    abstract ator(id: string): Nullable<Ator> | Promise<Nullable<Ator>>;

    abstract generos(): Genero[] | Promise<Genero[]>;

    abstract genero(id: string): Nullable<Genero> | Promise<Nullable<Genero>>;

    abstract filmes(): Filme[] | Promise<Filme[]>;

    abstract filme(id: string): Nullable<Filme> | Promise<Nullable<Filme>>;
}

export abstract class IMutation {
    abstract criarAtor(nome: string, dataDeNascimento: number, nacionalidade: string): Ator | Promise<Ator>;

    abstract criarGenero(nome: string): Genero | Promise<Genero>;

    abstract criarFilme(titulo: string, anoDeLancamento: number): Filme | Promise<Filme>;
}

type Nullable<T> = T | null;
