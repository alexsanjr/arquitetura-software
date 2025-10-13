import { LogStrategy } from "./LogStrategy";

export class DailySummaryLogger implements LogStrategy {
  private logs: string[] = [];

  log(message: string): void {
    this.logs.push(`${new Date().toISOString()} - ${message}`);
  }

  getSummary(): string {
    return this.logs.join("\n");
  }
}
