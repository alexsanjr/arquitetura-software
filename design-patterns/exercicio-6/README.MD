# 📝 Sistema de Logs - Aplicativo de Console (TypeScript + Node.js)

## 📖 Descrição

Uma empresa precisa de um aplicativo de console que registre eventos do sistema.  
O sistema foi desenvolvido em **Node.js** e **TypeScript**, aplicando o padrão de projeto **Strategy**, que permite alternar dinamicamente entre diferentes modos de saída de log (console, arquivo ou resumo diário).

---

## ⚙️ Funcionalidades

- O usuário pode digitar `log <mensagem>` para registrar um evento.
- O sistema armazena os logs **em memória**.
- O comando `mostrar` exibe todos os eventos registrados.
- O comando `modo <console|arquivo|resumo>` altera o tipo de saída de log:
  - **console** → Exibe logs no terminal.
  - **arquivo** → Grava logs em um arquivo `logs.txt`.
  - **resumo** → Armazena logs temporariamente e mostra o resumo ao final.
- O programa executa até o usuário digitar `sair`.

---

## 🧠 Padrão de Projeto Utilizado

### 🧩 Strategy

O padrão **Strategy** foi utilizado para permitir a troca dinâmica do comportamento de log.

- Cada tipo de saída de log (console, arquivo, resumo diário) é uma **estratégia diferente** que implementa a mesma interface.
- O **contexto (`LoggerContext`)** é responsável por armazenar a estratégia atual e delegar as operações de log.

Diagrama simplificado:
