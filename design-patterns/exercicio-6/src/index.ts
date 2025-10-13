import * as readline from "readline";
import { LoggerContext } from "./LoggerContext";
import { ConsoleLogger } from "./strategies/ConsoleLogger";
import { FileLogger } from "./strategies/FileLogger";
import { DailySummaryLogger } from "./strategies/DailySummaryLogger";
import { LogManager } from "./LogManager";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const logManager = new LogManager();
let strategy = new ConsoleLogger();
const logger = new LoggerContext(strategy);

console.log("=== Sistema de Log ===");
console.log("Comandos:");
console.log('- log <mensagem>');
console.log('- mostrar');
console.log('- modo <console|arquivo|resumo>');
console.log('- sair');
console.log("======================");

rl.on("line", (input) => {
  const [command, ...args] = input.trim().split(" ");
  const message = args.join(" ");

  switch (command) {
    case "log":
      if (!message) {
        console.log("Digite uma mensagem para logar.");
        break;
      }
      logManager.add(message);
      logger.log(message);
      break;

    case "mostrar":
      console.log("\n=== Logs armazenados ===");
      console.log(logManager.list().join("\n"));
      console.log("=========================\n");
      break;

    case "modo":
      switch (message.toLowerCase()) {
        case "console":
          logger.setStrategy(new ConsoleLogger());
          console.log("Modo alterado para: Console");
          break;
        case "arquivo":
          logger.setStrategy(new FileLogger());
          console.log("Modo alterado para: Arquivo");
          break;
        case "resumo":
          logger.setStrategy(new DailySummaryLogger());
          console.log("Modo alterado para: Resumo Diário");
          break;
        default:
          console.log("Modos disponíveis: console, arquivo, resumo");
      }
      break;

    case "sair":
      console.log("Saindo...");
      rl.close();
      break;

    default:
      console.log("Comando não reconhecido.");
  }
});
