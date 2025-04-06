"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { getCart } from "../utils/getCart";

export default function Cart() {
  const [cart, setCart] = useState<any>([]);

  const deleteFromCart = (id: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item: any) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    const newCart = getCart();
    newCart.then((res) => {
      setCart(res);
    });
  }, []);

  return (
    <div className="container">
      {cart.length && (
        <div className="flex gap-2 p-4">
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
