import React from "react";
import { render, screen, act, getByRole } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { Product } from "@/types/Product";
import { ToastProvider } from "@/components/Toast/ToastContext";

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
      <ToastProvider>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </ToastProvider>
    );

    const button = screen.getByText("Add");

    act(() => {
      button.click();
    });

    const count = screen.getByTestId("cart-count");
    expect(count.textContent).toBe("1");
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Success!"
    );
    expect(screen.getByRole("paragraph")).toHaveTextContent(
      "Test Product has been added to your cart."
    );

    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe("Test Product");
  });
  it("remove item from cart", () => {
    window.alert = jest.fn();

    localStorage.setItem("cart", JSON.stringify(mockCart));

    render(
      <ToastProvider>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </ToastProvider>
    );

    const button = screen.getByText("Remove from cart");

    act(() => {
      button.click();
    });

    const count = screen.getByTestId("cart-count");
    expect(count.textContent).toBe("0");
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Success!"
    );
    expect(screen.getByRole("paragraph")).toHaveTextContent(
      "Test Product has been removed from your cart."
    );

    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(stored.length).toBe(0);
  });
});
