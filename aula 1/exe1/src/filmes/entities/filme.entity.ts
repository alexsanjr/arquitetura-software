/* eslint-disable prettier/prettier */
import { Genero } from "./genero.entity";

export class Filme {
  id: number;
  titulo: string;
  anoDeLancamento: number;
  genero: Genero;
}
