# 📌 Desafio Design Pattern 3 - Adapter Pattern

## 🎯 Objetivo

Uma empresa recebe arquivos de produtos de fornecedores diferentes, cada um em um formato distinto. O desafio é padronizar todos os formatos para uma estrutura única utilizando o **Adapter Pattern**.

## 📋 Problema

A empresa recebe dados de produtos nos seguintes formatos:

- **JSON** 📄
- **XML** 📄
- **CSV** 📄

Todos devem ser convertidos para o formato padronizado:

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
}
```

## ✅ Requisitos Funcionais

1. **Parâmetros de entrada**: O programa deve receber o tipo de arquivo e o caminho via parâmetros:

   ```bash
   node app.js --input produtos.csv --format=csv
   ```

2. **Interface padrão**: Criar uma interface `IProductProvider` com método `load(): Product[]`

3. **Implementação de Adapters**:

   - `CsvAdapter` - Para arquivos CSV
   - `XmlAdapter` - Para arquivos XML
   - `JsonAdapter` - Para arquivos JSON

4. **Saída padronizada**: Exibir todos os produtos no console em formato JSON padronizado

## 🏗️ Arquitetura do Projeto

```
src/
├── index.ts                    # Ponto de entrada da aplicação
├── models/
│   └── Product.ts             # Interface do produto padronizado
├── providers/
│   └── IProductProvider.ts    # Interface base para providers
├── adapters/
│   ├── CsvAdapter.ts          # Adapter para arquivos CSV
│   ├── JsonAdapter.ts         # Adapter para arquivos JSON
│   └── XmlAdapter.ts          # Adapter para arquivos XML
└── factory/
    └── ProductProviderFactory.ts # Factory para criação de adapters
```

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Node.js** - Runtime
- **xml2js** - Parser para arquivos XML
- **csv-parse** - Parser para arquivos CSV

## 🚀 Como Executar

### Pré-requisitos

```bash
npm install
```

### Execução

```bash
# Para arquivos CSV
npm run dev -- --input=./data/produtos.csv --format=csv

# Para arquivos JSON
npm run dev -- --input=./data/produtos.json --format=json

# Para arquivos XML
npm run dev -- --input=./data/produtos.xml --format=xml
```

## 📁 Formato dos Arquivos de Entrada

### CSV

```csv
id,name,price
1,Produto A,10.50
2,Produto B,25.00
```

### JSON

```json
[
  { "id": "1", "name": "Produto A", "price": 10.5 },
  { "id": "2", "name": "Produto B", "price": 25.0 }
]
```

### XML

```xml
<products>
  <product>
    <id>1</id>
    <name>Produto A</name>
    <price>10.50</price>
  </product>
</products>
```

## 📤 Saída Esperada

```json
[
  {
    "id": "1",
    "name": "Produto A",
    "price": 10.5
  },
  {
    "id": "2",
    "name": "Produto B",
    "price": 25.0
  }
]
```

## 🎨 Design Pattern Utilizado

**Adapter Pattern**: Permite que interfaces incompatíveis trabalhem juntas, convertendo a interface de uma classe em outra interface esperada pelos clientes.

### Benefícios:

- ✅ Reutilização de código existente
- ✅ Separação de responsabilidades
- ✅ Facilita manutenção e extensibilidade
- ✅ Permite integração com sistemas legados

---

_Desenvolvido como parte do curso de Arquitetura de Software_
