import readline from "readline";
import { Editor } from "./editor";
import { Caretaker } from "./caretaker";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const editor = new Editor();
const caretaker = new Caretaker();

caretaker.adicionarMemento(editor.salvar());

console.log("Editor de Texto (digite 'escrever <texto>', 'listar', 'desfazer' ou 'sair')");

rl.on("line", (input) => {
  const comando = input.trim();

  if (comando === "sair") {
    console.log("Encerrando...");
    rl.close();
    return;
  }

  if (comando.startsWith("escrever ")) {
    const texto = comando.replace("escrever ", "");
    editor.escrever(texto);
    caretaker.adicionarMemento(editor.salvar());
  }
  else if (comando === "listar") {
    editor.listar();
  }
  else if (comando === "desfazer") {
    const mementoAnterior = caretaker.desfazer();
    if (mementoAnterior) {
      editor.restaurar(mementoAnterior);
      console.log("Última linha desfeita.");
    } else {
      console.log("Nada para desfazer.");
    }
  }
  else {
    console.log("Comando inválido. Use 'escrever <texto>', 'listar', 'desfazer' ou 'sair'.");
  }
});
