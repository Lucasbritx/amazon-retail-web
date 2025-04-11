"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { getCart } from "../utils/getCart";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";
import Button from "@/components/Button";

export default function Cart() {
  const { deleteFromCart } = useCart();
  const [cart, setCart] = useState<any>([]);

  const submitOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const newCart = getCart();
    newCart.then((res) => {
      setCart(res);
    });
  }, []);

  return (
    <div className="relative">
      {cart.length && (
        <div className="flex gap-2 p-4">
          {cart?.map((product: Product) => (
            <Card
              key={product.id}
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              onClick={deleteFromCart}
              buttonText="Remove from cart"
            />
          ))}
        </div>
      )}
      <Button
        onClick={() => {
          submitOrder();
        }}
      >
        Submit Order
      </Button>
    </div>
  );
}
