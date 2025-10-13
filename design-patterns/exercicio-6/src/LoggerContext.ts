import { LogStrategy } from "./strategies/LogStrategy";

export class LoggerContext {
  private strategy: LogStrategy;

  constructor(strategy: LogStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: LogStrategy) {
    this.strategy = strategy;
  }

  log(message: string) {
    this.strategy.log(message);
  }

  getSummary(): string | undefined {
    return this.strategy.getSummary?.();
  }
}
