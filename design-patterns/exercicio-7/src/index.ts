import * as readline from "readline";
import { User } from "./models/User";
import { VideoProxy } from "./proxies/VideoProxy";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const users = [
  new User("ana", "normal"),
  new User("bruno", "premium"),
];

const videos = [
  new VideoProxy("Aula 1 - Introdução à Programação", "gratuito"),
  new VideoProxy("Aula 2 - POO em TypeScript", "premium"),
  new VideoProxy("Aula 3 - Design Patterns", "premium"),
];

let currentUser: User | null = null;

console.log("🎓 Sistema de Acesso a Vídeos Educativos");
console.log("Comandos:");
console.log("- entrar <usuario>");
console.log("- assistir <titulo>");
console.log("- sair");
console.log("=========================");

rl.on("line", (input) => {
  const [command, ...args] = input.trim().split(" ");
  const argument = args.join(" ");

  switch (command) {
    case "entrar":
      const user = users.find((u) => u.name.toLowerCase() === argument.toLowerCase());
      if (user) {
        currentUser = user;
        console.log(`Usuário logado: ${user.name} (${user.type})`);
      } else {
        console.log("Usuário não encontrado. Use 'ana' (normal) ou 'bruno' (premium).");
      }
      break;

    case "assistir":
      if (!currentUser) {
        console.log("Faça login primeiro usando 'entrar <usuario>'.");
        break;
      }

      const video = videos.find((v) => v.title.toLowerCase().includes(argument.toLowerCase()));
      if (!video) {
        console.log("Vídeo não encontrado.");
        break;
      }

      video.play(currentUser);
      break;

    case "sair":
      console.log("Saindo...");
      rl.close();
      break;

    default:
      console.log("Comando não reconhecido.");
  }
});
