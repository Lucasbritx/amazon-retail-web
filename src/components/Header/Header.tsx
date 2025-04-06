"use client";

import React from "react";
import Input from "../Input";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Header: React.FC = () => {
  const { cartItems: cart } = useCart();
  const cartLength = cart.length;

  const BUTTONS = [
    { text: "Home", onClick: () => {}, href: "/" },
    { text: "Products", onClick: () => {}, href: "/products" },
    {
      text: `Cart ${cartLength ? `(${cartLength})` : ""}`,
      onClick: () => {},
      href: "/cart",
    },
    { text: "Profile", onClick: () => {}, href: "/profile" },
    { text: "Orders", onClick: () => {}, href: "/orders" },
    { text: "Logout", onClick: () => {}, href: "/logout" },
  ];

  return (
    <div className="w-full h-20 bg-gray-800 text-white flex items-center justify-between px-4 py-2 mb-3">
      <img src="/Amazon_logo.png" alt="Amazon Retail" className="w-40 h-11" />
      <Input
        placeholder="Search for products..."
        className="border p-2 rounded-md w-1/3"
      />
      <div className="flex gap-4">
        {BUTTONS.map((button) => (
          <Link href={button.href} key={button.text}>
            {button.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
