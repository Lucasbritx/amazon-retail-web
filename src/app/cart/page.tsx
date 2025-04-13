"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { TOAST_TYPES } from "@/components/Toast/Toast";

export default function Cart() {
  const { cartItems, deleteFromCart } = useCart();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const submitOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await res.json();
    if (res.status === 201) {
      setIsSubmitSuccessful(true);
      setTimeout(() => {
        setIsSubmitSuccessful(false);
      }, 3000);
    } else {
      setIsSubmitSuccessful(false);
    }
    return data;
  };

  return (
    <div className="relative">
      {cartItems.length && (
        <div className="flex gap-2 p-4">
          {cartItems?.map((product: Product) => (
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
        className="absolute bottom-0 right-0 m-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
        type="button"
        disabled={cartItems.length === 0}
        onClick={() => {
          submitOrder();
        }}
      >
        Submit Order
      </Button>
      <Toast
        title="Sucess!"
        type={TOAST_TYPES.SUCCESS}
        isOpen={isSubmitSuccessful}
        onClose={() => setIsSubmitSuccessful(false)}
        description="Your order has been placed successfully!"
      />
    </div>
  );
}
