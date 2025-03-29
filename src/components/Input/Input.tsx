import React from "react";

type InputProps = React.ComponentProps<"input"> & {
};

const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className="border p-2 rounded-md"
      {...props}
    ></input>
  );
};

export default Input;
