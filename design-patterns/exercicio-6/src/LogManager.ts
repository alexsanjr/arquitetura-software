export class LogManager {
  private logs: string[] = [];

  add(message: string) {
    this.logs.push(`${new Date().toISOString()} - ${message}`);
  }

  list(): string[] {
    return this.logs;
  }
}
