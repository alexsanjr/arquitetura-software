import { EstadoPacote } from "./EstadoPacote";
import { Pacote } from "../Pacote";
import { CentroDistribuicao } from "./CentroDistribuicao";

export class EmTransito implements EstadoPacote {
  nome = "Em trânsito";
  private contador = 0;

  atualizar(pacote: Pacote): void {
    this.contador++;

    if (this.contador >= 2) {
      pacote.setEstado(new CentroDistribuicao());
      console.log(`Pacote ${pacote.codigo} chegou ao Centro de Distribuição.`);
    }
  }
}
