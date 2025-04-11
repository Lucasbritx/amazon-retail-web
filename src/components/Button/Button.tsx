import React from "react";

const Button = ({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="border p-2 rounded-md hover:opacity-50 cursor-pointer"
      {...props}
    >
    </button>
  );
};

export default Button;
