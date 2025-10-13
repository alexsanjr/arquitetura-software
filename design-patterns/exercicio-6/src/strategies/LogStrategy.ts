export interface LogStrategy {
  log(message: string): void;
  getSummary?(): string;
}
