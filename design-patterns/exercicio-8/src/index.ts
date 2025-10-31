import * as readline from 'readline';
import { Message, SimpleMessage } from './models/Message';
import { TimestampDecorator } from './decorators/TimestampDecorator';
import { UppercaseDecorator } from './decorators/UppercaseDecorator';
import { PriorityDecorator } from './decorators/PriorityDecorator';

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

async function processMessage(messageContent: string): Promise<void> {
  let message: Message = new SimpleMessage(messageContent);

  // Perguntar sobre prioridade primeiro (para aparecer no início)
  const addPriority = await question('Adicionar prioridade? (s/n): ');
  
  // Perguntar sobre timestamp
  const addTimestamp = await question('Aplicar timestamp? (s/n): ');
  
  // Perguntar sobre maiúsculas
  const addUppercase = await question('Transformar em maiúsculas? (s/n): ');

  // Aplicar decoradores na ordem correta
  // Primeiro maiúsculas (se necessário)
  if (addUppercase.toLowerCase() === 's') {
    message = new UppercaseDecorator(message);
  }

  // Depois timestamp
  if (addTimestamp.toLowerCase() === 's') {
    message = new TimestampDecorator(message);
  }

  // Por último prioridade (para ficar no início)
  if (addPriority.toLowerCase() === 's') {
    message = new PriorityDecorator(message);
  }

  console.log('\nMensagem final: ' + message.getContent() + '\n');
}

async function main(): Promise<void> {
  console.log('=== Sistema de Envio de Mensagens ===');
  console.log('Digite "enviar <mensagem>" para criar uma mensagem');
  console.log('Digite "sair" para encerrar o programa\n');

  while (true) {
    const input = await question('> ');

    if (input.toLowerCase() === 'sair') {
      console.log('Encerrando o programa...');
      rl.close();
      break;
    }

    // Verificar se o comando começa com "enviar"
    const enviarMatch = input.match(/^enviar\s+"(.+)"|^enviar\s+(.+)/i);
    
    if (enviarMatch) {
      // Pegar a mensagem (com ou sem aspas)
      const messageContent = enviarMatch[1] || enviarMatch[2];
      await processMessage(messageContent);
    } else {
      console.log('Comando inválido. Use: enviar <mensagem>\n');
    }
  }
}

main().catch((error) => {
  console.error('Erro:', error);
  rl.close();
  process.exit(1);
});
