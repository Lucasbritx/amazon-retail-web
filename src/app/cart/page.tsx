"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function Cart() {
  const [cart, setCart] = useState<any>([]);

  const getCart = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cart);
  };

  const deleteFromCart = (id: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item: any) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="container">
      {cart.length && (
        <div className="flex gap-1">
          {cart?.map((product: any) => (
            <Card
              key={product.id}
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              onClick={deleteFromCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
