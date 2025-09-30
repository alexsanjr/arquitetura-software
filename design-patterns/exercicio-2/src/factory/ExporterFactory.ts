import { IExportStrategy } from "../strategies/IExportStrategy";
import { TxtExportStrategy } from "../strategies/TxtExportStrategy";
import { JsonExportStrategy } from "../strategies/JsonExportStrategy";

export class ExporterFactory {
  static createExporter(type: "txt" | "json"): IExportStrategy {
    if (type === "txt") return new TxtExportStrategy();
    return new JsonExportStrategy();
  }
}
