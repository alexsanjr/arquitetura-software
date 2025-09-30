export interface IAlertStrategy {
  checkAlert(currentPrice: number): void;
}