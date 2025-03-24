"use client";
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
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
      <h1>Amazon Retail</h1>
      <p>POC for Amazon Retail</p>
      {products.length && (
        <div className="flex gap-1">
          {products?.map((product: any) => (
            <div key={product.id} className="product">
              <img src={product.img} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <button onClick={() => getProduct(product.id)}>
                Get Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
