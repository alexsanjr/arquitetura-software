import { IAlertStrategy } from "./IAlertStrategy";

type PriceRecord = { time: Date; price: number };

export class VariationStrategy implements IAlertStrategy {
  private variationPercent: number;
  private minutes: number;
  private history: PriceRecord[] = [];

  constructor(variationPercent: number, minutes: number) {
    this.variationPercent = variationPercent;
    this.minutes = minutes;
  }

  checkAlert(currentPrice: number): void {
    const now = new Date();
    this.history.push({ time: now, price: currentPrice });

    // remover registros muito antigos
    this.history = this.history.filter(
      (r) => (now.getTime() - r.time.getTime()) / 60000 <= this.minutes
    );

    const oldest = this.history[0]?.price;
    if (oldest) {
      const variation = ((currentPrice - oldest) / oldest) * 100;
      if (Math.abs(variation) >= this.variationPercent) {
        console.log(
          `[ALERTA] Variação de ${variation.toFixed(
            2
          )}% em ${this.minutes} minutos!`
        );
      }
    }
  }
}
