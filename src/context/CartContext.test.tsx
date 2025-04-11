import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { Product } from "@/types/Product";

const product: Product = {
  id: 1,
  name: "Test Product",
  price: 100,
  img: "https://picsum.photos/200/300",
};
const mockCart = [
  {
    id: 1,
    name: "Test Product",
    price: 100,
  },
];

const TestComponent = () => {
  const { cartItems, addToCart, deleteFromCart } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(product)}>Add</button>
      <button onClick={() => deleteFromCart(product)}>Remove from cart</button>
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
  it("remove item from cart", () => {
    window.alert = jest.fn();

    localStorage.setItem("cart", JSON.stringify(mockCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const button = screen.getByText("Remove from cart");

    act(() => {
      button.click();
    });

    const count = screen.getByTestId("cart-count");
    expect(count.textContent).toBe("0");
    expect(window.alert).toHaveBeenCalledWith("Product removed from cart");

    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(stored.length).toBe(0);
  });
});
