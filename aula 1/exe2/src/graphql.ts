
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

export abstract class IQuery {
    abstract atores(): Ator[] | Promise<Ator[]>;

    abstract ator(id: string): Nullable<Ator> | Promise<Nullable<Ator>>;

    abstract generos(): Genero[] | Promise<Genero[]>;

    abstract genero(id: string): Nullable<Genero> | Promise<Nullable<Genero>>;
}

export abstract class IMutation {
    abstract criarAtor(nome: string, dataDeNascimento: number, nacionalidade: string): Ator | Promise<Ator>;

    abstract criarGenero(nome: string): Genero | Promise<Genero>;
}

type Nullable<T> = T | null;
