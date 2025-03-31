"use client";

import React from "react";
import Input from "../Input";
import Link from "next/link";

const Header: React.FC = () => {
  const BUTTONS = [
    { text: "Home", onClick: () => {}, href: "/" },
    { text: "Products", onClick: () => {}, href: "/products" },
    { text: "Cart", onClick: () => {}, href: "/cart" },
    { text: "Profile", onClick: () => {}, href: "/profile" },
    { text: "Orders", onClick: () => {}, href: "/orders" },
    { text: "Logout", onClick: () => {}, href: "/logout" },
  ];

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 mb-3">
      <h1 className="text-2xl">Amazon Retail</h1>
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
