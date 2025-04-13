"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { CartContextType } from "@/types/CartContextType";
import { useToastContext } from "@/components/Toast/ToastContext";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setToastProps, clearToast } = useToastContext();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity ? p.quantity + 1 : 0 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToastProps({
      title: "Success!",
      description: `${product.name} has been added to your cart.`,
      type: "success",
      isOpen: true,
    });
    setTimeout(() => {
      clearToast();
    }, 3000);
  };

  const deleteFromCart = (product: Product) => {
    setCartItems((prev) => prev.filter((p) => p.id !== product.id));
    setToastProps({
      title: "Success!",
      description: `${product.name} has been removed from your cart.`,
      type: "success",
      isOpen: true,
    });
    setTimeout(() => {
      clearToast();
    }, 3000);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
