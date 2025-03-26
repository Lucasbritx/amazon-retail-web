import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  const mockProps = {
    id: 1,
    img: "https://picsum.photos/200/300",
    name: "Test Product",
    price: 100,
    onClick: jest.fn(),
  };

  it("renders correctly with given props", () => {
    render(<Card {...mockProps} />);

    expect(screen.getByAltText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
    expect(screen.getByText("Get Product")).toBeInTheDocument();
  });

  it("calls onClick with the correct id when the button is clicked", () => {
    render(<Card {...mockProps} />);

    const button = screen.getByText("Get Product");
    fireEvent.click(button);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onClick).toHaveBeenCalledWith(mockProps.id);
  });
});