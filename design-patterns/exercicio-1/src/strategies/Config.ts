export interface Config {
  coin: string;
  buyThreshold: number;
  sellThreshold: number;
  variationPercent: number;
  variationMinutes: number;
  strategy: "threshold" | "variation";
}
