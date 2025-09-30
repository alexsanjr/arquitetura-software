import * as fs from "fs";
import { IProductProvider } from "../providers/IProductProvider";
import { Product } from "../models/Product";

export class JsonAdapter implements IProductProvider {
  async load(filePath: string): Promise<Product[]> {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    return data.map((r: any) => ({
      id: r.id,
      name: r.name,
      price: Number(r.price),
    }));
  }
}
