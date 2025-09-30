import { Resume } from "../models/Resume";

export interface IExportStrategy {
  export(resume: Resume, filename: string): void;
}
