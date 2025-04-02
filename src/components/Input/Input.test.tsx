import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input Component", () => {
  test("renders input element", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("applies additional props correctly", () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates value on change", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    expect(inputElement.value).toBe("Hello");
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("supports disabled state", () => {
    render(<Input disabled />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });
});
