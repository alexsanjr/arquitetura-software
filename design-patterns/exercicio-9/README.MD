# Exercício 9 - Padrão Composite

## Descrição do Problema

Uma empresa quer um programa em console que simule um sistema de arquivos simples. O objetivo é permitir que o usuário organize arquivos e pastas, sendo que pastas podem conter outros arquivos ou pastas, de forma recursiva.

## Funcionalidades

- O usuário pode digitar `criar arquivo <nome>` para criar um arquivo na pasta atual
- O usuário pode digitar `criar pasta <nome>` para criar uma nova pasta dentro da pasta atual
- O usuário pode digitar `entrar <nome>` para entrar em uma pasta existente
- O usuário pode digitar `voltar` para voltar para a pasta anterior
- O usuário pode digitar `listar` para mostrar todo o conteúdo da pasta atual, incluindo arquivos e subpastas, de forma hierárquica
- O programa roda em loop até o usuário digitar `sair`

## Exemplo de Uso

```
/root> criar pasta documentos
✅ Pasta "documentos" criada com sucesso.

/root> criar pasta projetos
✅ Pasta "projetos" criada com sucesso.

/root> criar arquivo readme.txt
✅ Arquivo "readme.txt" criado com sucesso.

/root> listar

📂 Conteúdo de "root":

📁 root/
  📁 documentos/
  📁 projetos/
  📄 readme.txt

/root> entrar documentos
✅ Entrou na pasta: documentos

/root/documentos> criar arquivo relatorio.pdf
✅ Arquivo "relatorio.pdf" criado com sucesso.

/root/documentos> criar pasta contratos
✅ Pasta "contratos" criada com sucesso.

/root/documentos> listar

📂 Conteúdo de "documentos":

📁 documentos/
  📄 relatorio.pdf
  📁 contratos/

/root/documentos> voltar
✅ Voltou para: root

/root> listar

📂 Conteúdo de "root":

📁 root/
  📁 documentos/
    📄 relatorio.pdf
    📁 contratos/
  📁 projetos/
  📄 readme.txt
```

## Padrão de Design Utilizado

### Composite Pattern

O padrão **Composite** permite que você componha objetos em estruturas de árvore para representar hierarquias parte-todo. Este padrão permite que clientes tratem objetos individuais e composições de objetos de maneira uniforme.

#### Estrutura da Solução

```
src/
├── models/
│   ├── FileSystemComponent.ts  # Componente abstrato base
│   ├── File.ts                 # Folha (arquivo individual)
│   └── Folder.ts               # Composite (pasta que contém outros componentes)
├── services/
│   └── FileSystemNavigator.ts  # Gerencia navegação entre pastas
└── index.ts                     # Aplicação principal
```

#### Componentes

1. **FileSystemComponent (Component)**: Classe abstrata que define a interface comum para arquivos e pastas
   - Define operações básicas como `display()`, `getName()`, `isFolder()`
   - Define operações de composição que serão implementadas apenas por pastas

2. **File (Leaf)**: Representa um arquivo individual (folha da árvore)
   - Não pode conter outros componentes
   - Implementa apenas operações básicas

3. **Folder (Composite)**: Representa uma pasta que pode conter arquivos e outras pastas
   - Pode conter múltiplos componentes filhos
   - Implementa operações de composição (`add`, `remove`, `getChild`, `getChildren`)
   - Delega operações de exibição para seus filhos (recursivamente)

4. **FileSystemNavigator (Client)**: Gerencia a navegação entre pastas
   - Mantém controle da pasta atual
   - Mantém pilha de navegação para o comando `voltar`
   - Fornece métodos para navegar e listar conteúdo

#### Diagrama da Estrutura

```
         FileSystemComponent
         (abstract)
                ▲
                │
        ┌───────┴───────┐
        │               │
      File           Folder
     (Leaf)       (Composite)
                      │
                  children[]
                      │
              FileSystemComponent*
```

#### Vantagens do Padrão

- ✅ **Uniformidade**: Trata arquivos e pastas de forma uniforme através da mesma interface
- ✅ **Hierarquia Recursiva**: Permite estruturas aninhadas de qualquer profundidade
- ✅ **Facilidade de Extensão**: Novos tipos de componentes podem ser adicionados facilmente
- ✅ **Princípio Aberto/Fechado**: Adiciona novos componentes sem modificar código existente
- ✅ **Simplicidade para o Cliente**: O cliente não precisa distinguir entre objetos simples e compostos

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

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `criar arquivo <nome>` | Cria um novo arquivo na pasta atual | `criar arquivo documento.txt` |
| `criar pasta <nome>` | Cria uma nova pasta na pasta atual | `criar pasta projetos` |
| `entrar <nome>` | Entra em uma pasta existente | `entrar documentos` |
| `voltar` | Volta para a pasta anterior | `voltar` |
| `listar` | Lista todo o conteúdo da pasta atual | `listar` |
| `ajuda` | Mostra a lista de comandos disponíveis | `ajuda` |
| `sair` | Encerra o programa | `sair` |

## Exemplos de Cenários

### Cenário 1: Estrutura Básica de Projeto

```
/root> criar pasta src
/root> criar pasta tests
/root> criar arquivo package.json
/root> entrar src
/root/src> criar arquivo index.ts
/root/src> criar pasta models
/root/src> criar pasta services
/root/src> voltar
/root> listar
```

### Cenário 2: Organização de Documentos

```
/root> criar pasta 2025
/root> entrar 2025
/root/2025> criar pasta janeiro
/root/2025> criar pasta fevereiro
/root/2025> entrar janeiro
/root/2025/janeiro> criar arquivo relatorio_vendas.pdf
/root/2025/janeiro> criar arquivo notas_fiscais.xlsx
/root/2025/janeiro> listar
```

### Cenário 3: Estrutura de Desenvolvimento

```
/root> criar pasta projeto-web
/root> entrar projeto-web
/root/projeto-web> criar pasta frontend
/root/projeto-web> criar pasta backend
/root/projeto-web> criar arquivo README.md
/root/projeto-web> entrar frontend
/root/projeto-web/frontend> criar pasta components
/root/projeto-web/frontend> criar pasta styles
/root/projeto-web/frontend> criar arquivo index.html
```

## Validações Implementadas

- ✅ Não permite criar arquivos/pastas com nomes duplicados
- ✅ Não permite entrar em um arquivo (apenas em pastas)
- ✅ Não permite voltar além da pasta raiz
- ✅ Verifica se a pasta existe antes de entrar
- ✅ Mostra mensagens de erro claras e amigáveis

## Possíveis Extensões

O sistema pode ser facilmente estendido com novos recursos:

- **Link Simbólico**: Novo tipo de componente que aponta para outro componente
- **Arquivo Compactado**: Componente composite especial que contém arquivos comprimidos
- **Permissões**: Adicionar sistema de permissões de leitura/escrita
- **Busca**: Implementar busca recursiva de arquivos/pastas
- **Tamanho**: Adicionar informação de tamanho para arquivos e cálculo recursivo para pastas
- **Data de Criação**: Adicionar timestamps aos componentes
- **Mover/Copiar**: Implementar operações de mover e copiar componentes
- **Deletar**: Adicionar comando para remover arquivos e pastas
- **Renomear**: Adicionar comando para renomear componentes
- **Atalhos**: Implementar atalhos como `cd ..` para voltar ou `ls` para listar

## Conceitos Importantes do Composite

### Transparência vs Segurança

Esta implementação escolhe **segurança** sobre transparência:
- Operações de composição (`add`, `remove`, etc.) lançam erro quando chamadas em folhas
- Vantagem: Erros são detectados em tempo de execução
- Alternativa: Fazer operações de composição retornarem silenciosamente (transparência)

### Recursão

O método `display()` demonstra perfeitamente a natureza recursiva do padrão:
- Em `File`: simplesmente exibe o nome do arquivo
- Em `Folder`: exibe seu nome E chama `display()` em cada filho
- A recursão continua até atingir as folhas (arquivos)

## Tecnologias Utilizadas

- TypeScript
- Node.js
- Readline (para interface de console)

## Diferença entre Composite e Decorator

Embora ambos os padrões usem composição:

| Aspecto | Composite | Decorator |
|---------|-----------|-----------|
| **Propósito** | Representar hierarquias parte-todo | Adicionar responsabilidades dinamicamente |
| **Estrutura** | Árvore com múltiplos filhos | Cadeia linear de wrappers |
| **Relação** | "Tem muitos" (1:N) | "Envolve um" (1:1) |
| **Uso** | Estruturas hierárquicas | Adicionar funcionalidades |

## Conclusão

Este exercício demonstra o poder do padrão Composite para criar estruturas hierárquicas complexas mantendo o código simples e extensível. A implementação fornece uma base sólida que pode ser facilmente expandida com novos tipos de componentes e funcionalidades.
