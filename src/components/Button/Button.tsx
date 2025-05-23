import React from "react";
import classNames from "classnames";

const Button = ({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonClass = classNames(
    "border p-2 rounded-md hover:opacity-50 cursor-pointer",
    className
  );

  return <button className={buttonClass} {...props}></button>;
};

export default Button;
