# 📌 Desafio Design Pattern 1

---

## 📝 Instruções

Você foi contratado para criar um aplicativo de **console** que monitore o preço de uma criptomoeda em tempo real.

O programa deve:

- Solicitar ao usuário o nome da moeda (ex.: `bitcoin`, `ethereum`, `solana`);
- Mostrar o preço atual em **dólares**.

---

## ⚙️ Estratégias de Alerta

O sistema deve permitir configurar **estratégias de alerta**:

- **ThresholdStrategy**  
  Dispara alerta se o preço ultrapassar valores definidos de compra/venda.

- **VariationStrategy**  
  Dispara alerta se a moeda variar mais de **X% em Y minutos**.

---

## ✅ Requisitos

- O aplicativo deve rodar em **loop** até o usuário digitar `sair`.
- A configuração (**moeda padrão, valores de compra/venda, percentual de variação**) deve ser lida **apenas uma vez** de um arquivo `config.json`.
- A lógica de alerta deve ser **flexível**.
- Pode-se usar **qualquer API pública de criptomoedas**.

🔗 Exemplo de API: [CoinGecko Docs](https://docs.coingecko.com/docs/setting-up-your-api-key)

---

## ⚠️ Observação

Só pode utilizar **os padrões apresentados em sala**:

- Factory Method
- Builder
- Singleton
- Adapter (Class)
- Strategy
