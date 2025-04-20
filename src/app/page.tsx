"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { useCart } from "@/context/CartContext";
import { getProducts } from "./service/getProducts";
import Button from "@/components/Button";

export default function Home() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <div className="">
      {products.length && (
        <div className="flex gap-2 p-4 flex-wrap">
          {products?.map((product: any) => (
            <Card
              key={product.id}
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              onClick={addToCart}
              buttonText="Add to cart"
            />
          ))}
        </div>
      )}
      <Button
        className="absolute bottom-0 right-0 m-4 bg-white hover:bg-gray-200 hover:opacity-100"
        onClick={() => {
          window.location.href = "/newProduct";
        }}>
        Add New Product
        </Button>
    </div>
  );
}
