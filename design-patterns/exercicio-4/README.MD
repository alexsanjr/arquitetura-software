# 📝 Editor de Texto com Padrão Memento

Este projeto é um **aplicativo de console em Node.js e TypeScript** que simula um pequeno **editor de texto**, permitindo ao usuário escrever, listar, desfazer e sair — tudo com histórico preservado.

O sistema utiliza o **Padrão de Projeto Memento** para gerenciar o histórico de edições, possibilitando o comando **`desfazer`** sem perda de estado anterior.

---

## 🎯 Objetivo do Desafio

Você foi contratado para criar um aplicativo de console que funciona como um pequeno editor de texto. O usuário pode digitar linhas de texto livremente e o programa mantém um histórico.

Funcionalidades:

- O usuário pode digitar `escrever <TEXTO>` para adicionar uma nova linha.
- O usuário pode digitar "desfazer" para remover a última linha escrita.
- O usuário pode digitar "listar" para mostrar todo o texto até agora.
- O sistema deve rodar até que o usuário digite sair.
- O histórico de operações deve ser controlado de forma que a ação de desfazer não se perca, mesmo que o usuário faça várias edições.
- Use **pelo menos um Design Pattern** entre:  
  `Abstract Factory`, `Prototype`, `Bridge`, `Composite`, `Decorator`, `Facade`, `Flyweight`, `Proxy`, `Chain of Responsibility`, `Command`, `Mediator`, `Memento`, `State`.

O padrão escolhido neste projeto foi o **Memento**, que é ideal para implementar a funcionalidade de **desfazer**.

---

## 🧩 Padrão de Projeto Utilizado: MEMENTO

### 🔍 Conceito

O **Memento Pattern** permite **salvar e restaurar o estado de um objeto** sem expor sua estrutura interna.  
Ele é composto por três papéis principais:

- **Originator** → o objeto que gera e restaura estados (aqui, o `Editor`);
- **Memento** → o objeto que armazena o estado (aqui, `Memento`);
- **Caretaker** → o responsável por gerenciar os mementos salvos (aqui, `Caretaker`).

### 💡 Aplicação no Projeto

Neste editor:

- Cada vez que o usuário escreve algo, o estado atual do texto é salvo em um `Memento`;
- O `Caretaker` mantém uma pilha desses estados;
- O comando `desfazer` restaura o estado anterior do editor.

---

## ⚙️ Funcionalidades

| Comando            | Descrição                                                  |
| ------------------ | ---------------------------------------------------------- |
| `escrever <texto>` | Adiciona uma nova linha de texto ao editor                 |
| `listar`           | Mostra o texto atual armazenado                            |
| `desfazer`         | Remove a última linha escrita (restaura o estado anterior) |
| `sair`             | Encerra o programa                                         |

---

## 🧠 Exemplo de Execução

```bash
> escrever Olá mundo
> escrever Isso é um teste
> listar
1: Olá mundo
2: Isso é um teste
> desfazer
Última linha desfeita.
> listar
1: Olá mundo
> sair
Encerrando...
```
