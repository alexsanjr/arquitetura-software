# 🎓 Sistema de Acesso a Vídeos Educativos

## 📖 Descrição

Este projeto implementa um aplicativo de console em **Node.js** e **TypeScript** para gerenciar o acesso a vídeos educativos, aplicando o padrão de projeto **Proxy**.

Nem todos os usuários podem assistir a todos os vídeos:

- Usuários **normais** só assistem vídeos **gratuitos**.
- Usuários **premium** podem assistir a todos.

---

## ⚙️ Funcionalidades

- `entrar <usuario>` → Faz login no sistema.
- `assistir <titulo>` → Tenta assistir a um vídeo.
- `sair` → Encerra o programa.
- O Proxy controla se o usuário tem permissão antes de abrir o vídeo real.

---

## 🧠 Padrão de Projeto: **Proxy**

### Objetivo

Controlar o acesso ao objeto real (`RealVideo`), carregando-o **somente quando o usuário tiver permissão**.

## 🧾 Regras do Proxy

- Quando o usuário tenta assistir a um vídeo, o **Proxy verifica a permissão** antes de criar/abrir o vídeo real.
- O **vídeo real só é carregado se o usuário tiver acesso**.
- O **Proxy deve imprimir mensagens** indicando se o acesso foi permitido ou negado.
