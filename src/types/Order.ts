import { Product } from "./Product";

export type Order = {
  id: number;
  items: Product[];
};
