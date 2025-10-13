import { LogStrategy } from "./LogStrategy";
import * as fs from "fs";

export class FileLogger implements LogStrategy {
  private filePath = "logs.txt";

  log(message: string): void {
    const logLine = `[FILE] ${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(this.filePath, logLine);
  }
}
