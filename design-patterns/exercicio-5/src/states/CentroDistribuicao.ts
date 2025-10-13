import { EstadoPacote } from "./EstadoPacote";
import { Pacote } from "../Pacote";
import { Entregue } from "./Entregue";

export class CentroDistribuicao implements EstadoPacote {
  nome = "No centro de distribuição";
  private contador = 0;

  atualizar(pacote: Pacote): void {
    this.contador++;

    if (this.contador >= 1) {
      pacote.setEstado(new Entregue());
      console.log(`Pacote ${pacote.codigo} foi ENTREGUE!`);
    }
  }
}
