import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <button
      className="border p-2 rounded-md hover:opacity-50 cursor-pointer"
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
