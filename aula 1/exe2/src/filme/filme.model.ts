import { Ator } from '../ator/ator.model';
import { Genero } from '../genero/genero.model';

export class Filme {
  id: string;
  titulo: string;
  anoDeLancamento: number;
  atores?: Ator[];
  generos?: Genero[];
}
