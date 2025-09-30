import { Product } from "../models/Product";

export interface IProductProvider {
  load(filePath: string): Promise<Product[]>;
}