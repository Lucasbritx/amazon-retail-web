import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  const mockOnClick = jest.fn();
  const buttonText = "Buy Now";

  it("renders correctly with the given text", () => {
    render(<Button onClick={mockOnClick} children={buttonText} />);

    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it("calls onClick when the button is clicked", () => {
    render(<Button onClick={mockOnClick} children={buttonText} />);

    const button = screen.getByText(buttonText);
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
