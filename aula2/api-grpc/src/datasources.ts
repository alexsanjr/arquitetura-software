
import { AtorDatasource } from "./Ator/Datasource.js";
import { FilmeDatasource } from "./Filme/Datasource.js";
import { GeneroDatasource } from "./Genero/Datasource.js";


export { AtorDatasource } from "./Ator/Datasource.js";
export { FilmeDatasource } from "./Filme/Datasource.js";
export { GeneroDatasource } from "./Genero/Datasource.js";

export const atorDatasource = new AtorDatasource();
export const filmeDatasource = new FilmeDatasource();
export const generoDatasource = new GeneroDatasource();


export type { Ator, Filme, Genero, FilmeAtor, FilmeGenero } from "./database/db.js";
