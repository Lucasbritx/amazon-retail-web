import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { Product } from "@/types/Product";

const TestComponent = () => {
  const { cartItems, addToCart } = useCart();

  return (
    <div>
      <button
        onClick={() =>
          addToCart({ id: 1, name: "Test Product", price: 100 } as Product)
        }
      >
        Add
      </button>
      <div data-testid="cart-count">{cartItems.length}</div>
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("adds item to cart", () => {
    window.alert = jest.fn();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const button = screen.getByText("Add");

    act(() => {
      button.click();
    });

    const count = screen.getByTestId("cart-count");
    expect(count.textContent).toBe("1");
    expect(window.alert).toHaveBeenCalledWith("Product added to cart");

    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe("Test Product");
  });
});
