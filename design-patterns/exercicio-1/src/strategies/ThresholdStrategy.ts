import type { IAlertStrategy } from "./IAlertStrategy";

export class ThresholdStrategy implements IAlertStrategy {
  private buyThreshold: number;
  private sellThreshold: number;

  constructor(buyThreshold: number, sellThreshold: number) {
    this.buyThreshold = buyThreshold;
    this.sellThreshold = sellThreshold;
  }

  checkAlert(currentPrice: number): void {
    if (currentPrice <= this.buyThreshold) {
      console.log(`[ALERTA] Preço caiu para ${currentPrice}, hora de COMPRAR!`);
    } else if (currentPrice >= this.sellThreshold) {
      console.log(`[ALERTA] Preço subiu para ${currentPrice}, hora de VENDER!`);
    }
  }
}
