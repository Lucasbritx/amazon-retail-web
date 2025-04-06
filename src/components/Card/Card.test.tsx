import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";
import { CartProvider } from "@/context/CartContext";

describe("Card Component", () => {
  const mockProps = {
    id: 1,
    img: "https://picsum.photos/200/300",
    name: "Test Product",
    price: 100,
    onClick: jest.fn(),
  };

  const withProviders = (ui: React.ReactNode) => {
      return render(<CartProvider>{ui}</CartProvider>);
    };

  it("renders correctly with given props", () => {
    withProviders(<Card {...mockProps} />);

    expect(screen.getByAltText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByRole("price")).toBeInTheDocument();
    expect(screen.getByText("Get Product")).toBeInTheDocument();
  });

  it("calls onClick with the correct id when the button is clicked", () => {
    withProviders(<Card {...mockProps} />);

    const button = screen.getByText("Get Product");
    fireEvent.click(button);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onClick).toHaveBeenCalledWith(mockProps.id);
  });
});
