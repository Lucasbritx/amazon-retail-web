import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button className="border p-2 rounded-md hover:opacity-50 cursor-pointer" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
