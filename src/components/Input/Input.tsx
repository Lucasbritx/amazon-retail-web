import React from "react";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
};

const Input = ({ ...props }: InputProps) => {
  return (
    <div className="flex flex-col mb-4">
      {props.label && (
        <label className="text-sm text-gray-700 mb-1">{props.label}</label>
      )}
      <input className="border p-2 rounded-md" {...props}></input>
    </div>
  );
};

export default Input;
