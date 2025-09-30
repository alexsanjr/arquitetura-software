import axios from "axios";
import * as fs from "fs";
import * as readline from "readline";
import { Config } from "./strategies/Config";
import { IAlertStrategy } from "./strategies/IAlertStrategy";
import { ThresholdStrategy } from "./strategies/ThresholdStrategy";
import { VariationStrategy } from "./strategies/VariationStrategy";

async function main() {
  // carregar configuração uma vez
  const config: Config = JSON.parse(fs.readFileSync("src/config.json", "utf-8"));

  let strategy: IAlertStrategy;
  if (config.strategy === "threshold") {
    strategy = new ThresholdStrategy(config.buyThreshold, config.sellThreshold);
  } else {
    strategy = new VariationStrategy(
      config.variationPercent,
      config.variationMinutes
    );
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const coin = await new Promise<string>((resolve) => {
      rl.question("Digite o nome da moeda (ou 'sair'): ", resolve);
    });

    if (coin.toLowerCase() === "sair") {
      rl.close();
      break;
    }

    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
      const response = await axios.get(url);
      const data = response.data as { [key: string]: { usd: number } };
      const price = data[coin]?.usd;

      if (price) {
        console.log(`Preço atual de ${coin}: $${price}`);
        strategy.checkAlert(price);
      } else {
        console.log("Moeda não encontrada!");
      }
    } catch (err) {
      console.error("Erro ao consultar API:", err);
    }

    await new Promise((res) => setTimeout(res, 3000));
  }
}

main();
