import { Memento } from "./memento";

export class Editor {
  private lines: string[] = [];

  escrever(texto: string): void {
    this.lines.push(texto);
  }

  listar(): void {
    if (this.lines.length === 0) {
      console.log("(sem texto ainda)");
      return;
    }

    console.log("\n=== Texto Atual ===");
    this.lines.forEach((linha, i) => console.log(`${i + 1}: ${linha}`));
    console.log("===================\n");
  }

  salvar(): Memento {
    return new Memento(this.lines);
  }

  restaurar(memento: Memento): void {
    this.lines = memento.getState();
  }
}
