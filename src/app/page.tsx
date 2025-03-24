'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState("");

  const getProducts = async () => {
    const res = await fetch("/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log("DATA - ",  data);
    setProducts(data.products);
  };

  const getProduct = async (id: number) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <h1>Amazon Retail</h1>
      <p>POC for Amazon Retail</p>
    </div>
  );
}
