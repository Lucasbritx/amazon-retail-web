'use client';

import React from "react";
import Button from "../Button";
import Input from "../Input";

const BUTTONS = [
  { text: "Home", onClick: () => {} },
  { text: "Products", onClick: () => {} },
  { text: "Cart", onClick: () => {} },
  { text: "Profile", onClick: () => {} },
  { text: "Logout", onClick: () => {} },
];

const Header: React.FC = () => {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 mb-3">
      <h1 className="text-2xl">Amazon Retail</h1>
      <Input 
      placeholder="Search for products..."
      className="border p-2 rounded-md w-1/3"
      />
      <div className="flex gap-4">
        {BUTTONS.map((button) => (
          <Button
            key={button.text}
            onClick={button.onClick}
            text={button.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
