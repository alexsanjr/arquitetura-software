import * as fs from "fs";
import { Resume } from "../models/Resume";
import { IExportStrategy } from "./IExportStrategy";
import { ResumeAdapter } from "../adapters/ResumeAdapter";

export class TxtExportStrategy implements IExportStrategy {
  export(resume: Resume, filename: string): void {
    const adapter = new ResumeAdapter(resume);
    fs.writeFileSync(filename + ".txt", adapter.toPlainText(), "utf-8");
    console.log(`Currículo salvo em ${filename}.txt`);
  }
}
