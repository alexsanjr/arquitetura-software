import { IProductProvider } from "../providers/IProductProvider";
import { CsvAdapter } from "../adapters/CsvAdapter";
import { JsonAdapter } from "../adapters/JsonAdapter";
import { XmlAdapter } from "../adapters/XmlAdapter";

export class ProductProviderFactory {
  static create(format: string): IProductProvider {
    switch (format) {
      case "csv":
        return new CsvAdapter();
      case "json":
        return new JsonAdapter();
      case "xml":
        return new XmlAdapter();
      default:
        throw new Error("Formato não suportado: " + format);
    }
  }
}
