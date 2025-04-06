import { Product } from "./Product";

export type CartContextType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
};