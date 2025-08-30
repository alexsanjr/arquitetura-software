
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
    atores?: Nullable<Ator[]>;
    generos?: Nullable<Genero[]>;
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

    abstract atualizarAtor(id: string, nome?: Nullable<string>, dataDeNascimento?: Nullable<number>, nacionalidade?: Nullable<string>): Ator | Promise<Ator>;

    abstract removerAtor(id: string): boolean | Promise<boolean>;

    abstract criarGenero(nome: string): Genero | Promise<Genero>;

    abstract criarFilme(titulo: string, anoDeLancamento: number): Filme | Promise<Filme>;

    abstract atualizarFilme(id: string, titulo?: Nullable<string>, anoDeLancamento?: Nullable<number>): Filme | Promise<Filme>;

    abstract removerFilme(id: string): boolean | Promise<boolean>;

    abstract adicionarAtoresEmFilme(filmeId: string, atorIds: string[]): Filme | Promise<Filme>;

    abstract removerAtorDeFilme(filmeId: string, atorId: string): Filme | Promise<Filme>;

    abstract adicionarGenerosEmFilme(filmeId: string, generoIds: string[]): Filme | Promise<Filme>;
}

type Nullable<T> = T | null;
