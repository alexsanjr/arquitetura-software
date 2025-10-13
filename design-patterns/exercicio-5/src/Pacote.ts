import { EstadoPacote } from "./states/EstadoPacote";
import { Registrado } from "./states/Registrado";

export class Pacote {
  private estado: EstadoPacote;

  constructor(public codigo: string) {
    this.estado = new Registrado();
  }

  getEstado(): string {
    return this.estado.nome;
  }

  atualizar(): void {
    this.estado.atualizar(this);
  }

  setEstado(estado: EstadoPacote): void {
    this.estado = estado;
  }
}
