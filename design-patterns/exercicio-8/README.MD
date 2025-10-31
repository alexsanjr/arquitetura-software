# Exercício 8 - Padrão Decorator

## Descrição do Problema

Uma empresa quer um programa em console que permita enviar mensagens com diferentes melhorias opcionais. O objetivo é que o usuário possa adicionar funcionalidades às mensagens sem modificar a classe base.

## Funcionalidades

- O usuário digita `enviar <mensagem>` para criar uma nova mensagem.
- O usuário pode escolher aplicar melhorias à mensagem:
  - **Adicionar timestamp**: Adiciona o horário atual no formato [HH:MM:SS]
  - **Transformar em maiúsculas**: Converte todo o texto da mensagem para maiúsculas
  - **Adicionar prioridade**: Adiciona o marcador [PRIORIDADE] no início da mensagem
- O programa mostra no console a mensagem decorada de acordo com as escolhas do usuário
- O sistema roda em loop até o usuário digitar `sair`

## Exemplo de Uso

```
> enviar "Estudar design patterns"
Adicionar prioridade? (s/n): s
Aplicar timestamp? (s/n): s
Transformar em maiúsculas? (s/n): n

Mensagem final: [PRIORIDADE] [14:35:21] Estudar design patterns
```

## Padrão de Design Utilizado

### Decorator Pattern

O padrão **Decorator** permite adicionar funcionalidades a objetos de forma dinâmica, sem alterar sua estrutura original. É uma alternativa flexível à herança para estender funcionalidades.

#### Estrutura da Solução

```
src/
├── models/
│   └── Message.ts              # Interface e classe base da mensagem
├── decorators/
│   ├── MessageDecorator.ts     # Classe abstrata base para decoradores
│   ├── TimestampDecorator.ts   # Adiciona timestamp
│   ├── UppercaseDecorator.ts   # Converte para maiúsculas
│   └── PriorityDecorator.ts    # Adiciona marcador de prioridade
└── index.ts                     # Aplicação principal
```

#### Componentes

1. **Message (Interface)**: Define o contrato básico para todas as mensagens
2. **SimpleMessage**: Implementação concreta de uma mensagem simples
3. **MessageDecorator**: Classe abstrata que encapsula outra mensagem
4. **Decoradores Concretos**: Cada um adiciona uma funcionalidade específica:
   - `TimestampDecorator`: Adiciona horário
   - `UppercaseDecorator`: Transforma em maiúsculas
   - `PriorityDecorator`: Adiciona marcador de prioridade

#### Vantagens do Padrão

- ✅ **Princípio Aberto/Fechado**: Adiciona funcionalidades sem modificar código existente
- ✅ **Composição Dinâmica**: Funcionalidades podem ser combinadas em tempo de execução
- ✅ **Responsabilidade Única**: Cada decorador tem uma única responsabilidade
- ✅ **Flexibilidade**: Fácil adicionar novos decoradores sem afetar os existentes

## Como Executar

### Pré-requisitos

- Node.js instalado
- TypeScript instalado

### Instalação

```bash
npm install
```

### Executar em Modo de Desenvolvimento

```bash
npm run dev
```

### Executar em Modo de Produção

```bash
npm start
```

## Comandos Disponíveis

- `enviar "<mensagem>"` - Cria e processa uma nova mensagem
- `enviar <mensagem>` - Cria e processa uma nova mensagem (sem aspas)
- `sair` - Encerra o programa

## Exemplos de Execução

### Exemplo 1: Todas as funcionalidades

```
> enviar "Reunião importante amanhã"
Adicionar prioridade? (s/n): s
Aplicar timestamp? (s/n): s
Transformar em maiúsculas? (s/n): s

Mensagem final: [PRIORIDADE] [15:30:45] REUNIÃO IMPORTANTE AMANHÃ
```

### Exemplo 2: Apenas timestamp

```
> enviar "Lembrete para estudar"
Adicionar prioridade? (s/n): n
Aplicar timestamp? (s/n): s
Transformar em maiúsculas? (s/n): n

Mensagem final: [15:31:12] Lembrete para estudar
```

### Exemplo 3: Sem decorações

```
> enviar "Mensagem simples"
Adicionar prioridade? (s/n): n
Aplicar timestamp? (s/n): n
Transformar em maiúsculas? (s/n): n

Mensagem final: Mensagem simples
```

## Possíveis Extensões

O sistema pode ser facilmente estendido com novos decoradores, como:

- `EncryptionDecorator`: Criptografa a mensagem
- `EmojiDecorator`: Adiciona emojis à mensagem
- `HashtagDecorator`: Adiciona hashtags
- `ColorDecorator`: Adiciona cores ao texto (para terminais que suportam)
- `LengthLimitDecorator`: Limita o tamanho da mensagem

## Tecnologias Utilizadas

- TypeScript
- Node.js
- Readline (para interface de console)
