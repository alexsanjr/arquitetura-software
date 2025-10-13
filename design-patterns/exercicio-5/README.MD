# 📦 Sistema de Rastreamento de Pacotes

## 🧾 Instruções

Uma empresa de logística precisa de um aplicativo de console para acompanhar pacotes enviados por clientes.  
O sistema deve permitir registrar pacotes e consultar seu status atual.

### 🧩 Funcionalidades

- O usuário pode digitar `registrar <codigo>` para registrar um novo pacote.
- Cada pacote começa no estado **“registrado”**.

- O usuário pode digitar `status <codigo>` para consultar o estado atual do pacote.

- O programa roda em loop até que o usuário digite `sair`.

---

## 🔄 Regras de Mudança Automática de Estado

O sistema deve **simular a evolução dos pacotes** a cada iteração do loop principal (como se fosse o passar do tempo).  
Sempre que o usuário digitar um comando, **antes de executar a ação**, o sistema atualiza todos os pacotes seguindo as regras abaixo:

- **Registrado → Em trânsito**

  - Assim que o sistema atualizar pela primeira vez, o pacote sai do estado inicial **“registrado”** e passa para **“em trânsito”**.

- **Em trânsito → Centro de distribuição**

  - Após **2 atualizações** no estado **“em trânsito”**, o pacote é movido para **“no centro de distribuição”**.

- **Centro de distribuição → Entregue**
  - Após **1 atualização** no estado **“no centro de distribuição”**, o pacote muda para **“entregue”**.

| Estado Atual               | Próximo Estado            | Condição            |
| -------------------------- | ------------------------- | ------------------- |
| **Registrado**             | Em trânsito               | Após 1 atualização  |
| **Em trânsito**            | No centro de distribuição | Após 2 atualizações |
| **Centro de distribuição** | Entregue                  | Após 1 atualização  |
| **Entregue**               | —                         | Estado final        |

---

## 🧠 Padrão de Projeto Utilizado: STATE

### 📘 Conceito

O **Padrão State** permite que um objeto altere seu comportamento quando seu estado interno muda.  
Cada estado é representado por uma **classe separada**, e o objeto principal delega as ações ao estado atual.

### 💡 Aplicação neste Projeto

Cada **estado do pacote** é uma classe:

- `Registrado`
- `EmTransito`
- `CentroDistribuicao`
- `Entregue`

O objeto principal (`Pacote`) começa com o estado `Registrado` e, a cada atualização, muda para o próximo estado conforme as regras definidas.

---

## ⚙️ Funcionalidades Implementadas

| Comando              | Descrição                                      |
| -------------------- | ---------------------------------------------- |
| `registrar <codigo>` | Registra um novo pacote com o código informado |
| `status <codigo>`    | Mostra o estado atual do pacote                |
| `sair`               | Encerra o programa                             |
