import * as readline from 'readline';
import { Folder } from './models/Folder';
import { File } from './models/File';
import { FileSystemNavigator } from './services/FileSystemNavigator';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

function showHelp(): void {
  console.log('\nComandos disponíveis:');
  console.log('  criar arquivo <nome>  - Cria um novo arquivo');
  console.log('  criar pasta <nome>    - Cria uma nova pasta');
  console.log('  entrar <nome>         - Entra em uma pasta');
  console.log('  voltar                - Volta para a pasta anterior');
  console.log('  listar                - Lista o conteúdo da pasta atual');
  console.log('  ajuda                 - Mostra esta mensagem');
  console.log('  sair                  - Encerra o programa\n');
}

async function main(): Promise<void> {
  const root = new Folder('root');
  const navigator = new FileSystemNavigator(root);

  console.log('╔════════════════════════════════════════════╗');
  console.log('║   Sistema de Arquivos Simples - v1.0      ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('Digite "ajuda" para ver os comandos disponíveis\n');

  while (true) {
    const currentPath = navigator.getCurrentPath();
    const input = await question(`${currentPath}> `);

    if (!input) {
      continue;
    }

    const parts = input.split(' ');
    const command = parts[0].toLowerCase();

    switch (command) {
      case 'sair':
        console.log('Encerrando o sistema de arquivos...');
        rl.close();
        return;

      case 'ajuda':
        showHelp();
        break;

      case 'criar':
        if (parts.length < 3) {
          console.log('❌ Uso: criar arquivo <nome> ou criar pasta <nome>');
          break;
        }

        const type = parts[1].toLowerCase();
        const name = parts.slice(2).join(' ');

        if (type === 'arquivo') {
          const existingFile = navigator.getCurrentFolder().getChild(name);
          if (existingFile) {
            console.log(`❌ Já existe um item com o nome "${name}".`);
          } else {
            const file = new File(name);
            navigator.getCurrentFolder().add(file);
            console.log(`✅ Arquivo "${name}" criado com sucesso.`);
          }
        } else if (type === 'pasta') {
          const existingFolder = navigator.getCurrentFolder().getChild(name);
          if (existingFolder) {
            console.log(`❌ Já existe um item com o nome "${name}".`);
          } else {
            const folder = new Folder(name);
            navigator.getCurrentFolder().add(folder);
            console.log(`✅ Pasta "${name}" criada com sucesso.`);
          }
        } else {
          console.log('❌ Tipo inválido. Use: criar arquivo <nome> ou criar pasta <nome>');
        }
        break;

      case 'entrar':
        if (parts.length < 2) {
          console.log('❌ Uso: entrar <nome>');
          break;
        }

        const folderName = parts.slice(1).join(' ');
        navigator.enterFolder(folderName);
        break;

      case 'voltar':
        navigator.goBack();
        break;

      case 'listar':
        navigator.listContents();
        break;

      default:
        console.log('❌ Comando não reconhecido. Digite "ajuda" para ver os comandos disponíveis.');
        break;
    }
  }
}

main().catch((error) => {
  console.error('❌ Erro:', error);
  rl.close();
  process.exit(1);
});
