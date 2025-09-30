import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { IProductProvider } from "../providers/IProductProvider";
import { Product } from "../models/Product";

export class CsvAdapter implements IProductProvider {
  async load(filePath: string): Promise<Product[]> {
    const content = fs.readFileSync(filePath, "utf-8");
    const records = parse(content, { columns: true, skip_empty_lines: true });
    return records.map((r: any) => ({
      id: r.id,
      name: r.name,
      price: parseFloat(r.price),
    }));
  }
}
