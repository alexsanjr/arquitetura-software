import readline from "readline";
import { Pacote } from "./Pacote";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pacotes: Pacote[] = [];

console.log("Sistema de Rastreamento de Pacotes");
console.log("Comandos: registrar <codigo>, status <codigo>, sair");

rl.on("line", (input) => {
  const comando = input.trim();

  pacotes.forEach((p) => p.atualizar());

  if (comando === "sair") {
    console.log("Encerrando sistema...");
    rl.close();
    return;
  }

  if (comando.startsWith("registrar ")) {
    const codigo = comando.replace("registrar ", "").trim();
    if (!codigo) {
      console.log("Código inválido.");
      return;
    }
    const existente = pacotes.find((p) => p.codigo === codigo);
    if (existente) {
      console.log(`Pacote ${codigo} já foi registrado.`);
    } else {
      pacotes.push(new Pacote(codigo));
      console.log(`Pacote ${codigo} registrado com sucesso.`);
    }
  }
  else if (comando.startsWith("status ")) {
    const codigo = comando.replace("status ", "").trim();
    const pacote = pacotes.find((p) => p.codigo === codigo);
    if (pacote) {
      console.log(`Pacote ${codigo} está atualmente: ${pacote.getEstado()}`);
    } else {
      console.log(`Pacote ${codigo} não encontrado.`);
    }
  }
  else {
    console.log("Comando inválido. Use 'registrar <codigo>', 'status <codigo>' ou 'sair'.");
  }
});
