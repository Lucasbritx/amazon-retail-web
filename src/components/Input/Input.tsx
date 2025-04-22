import React from "react";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
};

const Input = ({ ...props }: InputProps) => {
  const { className, id, ...rest } = props;
  const inputId = id || props.name;
  return props.label ? (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={inputId}
        className="text-sm text-gray-700 mb-1"
      >
        {props.label}
      </label>
      <input id={inputId} className="border p-2 rounded-md" {...rest}></input>
    </div>
  ) : (
    <input className="border p-2 rounded-md" {...rest}></input>
  );
};

export default Input;
