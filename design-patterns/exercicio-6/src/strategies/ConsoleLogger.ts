import { LogStrategy } from "./LogStrategy";

export class ConsoleLogger implements LogStrategy {
  log(message: string): void {
    console.log(`[CONSOLE] ${new Date().toISOString()} - ${message}`);
  }
}
