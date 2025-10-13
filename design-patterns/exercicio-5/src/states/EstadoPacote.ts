import { Pacote } from "../Pacote";

export interface EstadoPacote {
  nome: string;
  atualizar(pacote: Pacote): void;
}
