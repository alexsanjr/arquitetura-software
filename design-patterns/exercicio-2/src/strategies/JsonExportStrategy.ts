import * as fs from "fs";
import { Resume } from "../models/Resume";
import { IExportStrategy } from "./IExportStrategy";
import { ResumeAdapter } from "../adapters/ResumeAdapter";

export class JsonExportStrategy implements IExportStrategy {
  export(resume: Resume, filename: string): void {
    const adapter = new ResumeAdapter(resume);
    fs.writeFileSync(filename + ".json", adapter.toJSON(), "utf-8");
    console.log(`Currículo salvo em ${filename}.json`);
  }
}
