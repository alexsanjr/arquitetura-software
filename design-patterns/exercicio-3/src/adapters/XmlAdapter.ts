import * as fs from "fs";
import { parseStringPromise } from "xml2js";
import { IProductProvider } from "../providers/IProductProvider";
import { Product } from "../models/Product";

export class XmlAdapter implements IProductProvider {
  async load(filePath: string): Promise<Product[]> {
    const content = fs.readFileSync(filePath, "utf-8");
    const result = await parseStringPromise(content);
    return result.products.product.map((p: any) => ({
      id: p.id[0],
      name: p.name[0],
      price: parseFloat(p.price[0]),
    }));
  }
}
