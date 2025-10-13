import { EstadoPacote } from "./EstadoPacote";
import { Pacote } from "../Pacote";

export class Entregue implements EstadoPacote {
  nome = "Entregue";

  atualizar(pacote: Pacote): void {
  }
}
