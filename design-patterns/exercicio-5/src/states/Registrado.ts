import { EstadoPacote } from "./EstadoPacote";
import { Pacote } from "../Pacote";
import { EmTransito } from "./EmTransito";

export class Registrado implements EstadoPacote {
  nome = "Registrado";

  atualizar(pacote: Pacote): void {
    pacote.setEstado(new EmTransito());
    console.log(`📦 Pacote ${pacote.codigo} agora está "Em trânsito".`);
  }
}
