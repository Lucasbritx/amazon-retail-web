"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import Card from "@/components/Card";
import { useCart } from "@/context/CartContext";

export default function Home() {
    const { addToCart } = useCart();
  
  const [products, setProducts] = useState<any>([]);

  const getProducts = async () => {
    const res = await fetch("/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setProducts(data.products);
  };

  const getProduct = async (id: number) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      {products.length && (
        <div className="flex gap-2 p-4">
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
    </div>
  );
}
