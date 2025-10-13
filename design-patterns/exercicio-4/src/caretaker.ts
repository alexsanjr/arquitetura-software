import { Memento } from "./memento";

export class Caretaker {
  private historico: Memento[] = [];

  adicionarMemento(memento: Memento): void {
    this.historico.push(memento);
  }

  desfazer(): Memento | null {
    this.historico.pop();
    return this.historico[this.historico.length - 1] || null;
  }
}
