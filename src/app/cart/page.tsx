"use client";
import React from "react";
import Card from "@/components/Card";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";
import Button from "@/components/Button";
import { useToastContext } from "@/components/Toast/ToastContext";
import { TOAST_TYPES } from "@/constants/TOAST_TYPES";

export default function Cart() {
  const { cartItems, deleteFromCart } = useCart();
  const { clearToast, toastProps, setToastProps } = useToastContext();

  const submitOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await res.json();
    if (res.status === 201) {
      setToastProps({
        ...toastProps,
        title: "Success!",
        description: "Your order has been placed successfully!",
        type: TOAST_TYPES.SUCCESS,
        isOpen: true,
      });
      setTimeout(() => {
        clearToast();
      }, 3000);
    } else {
      setToastProps({
        ...toastProps,
        title: "Error!",
        description: data.message,
        type: TOAST_TYPES.ERROR,
        isOpen: true,
      });
      setTimeout(() => {
        clearToast();
      }, 3000);
      throw new Error(data.message);
    }
    return data;
  };

  return (
    <div>
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
    </div>
  );
}
