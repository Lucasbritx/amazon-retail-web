import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { CartProvider } from "@/context/CartContext";

describe("Header component", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([{ id: 1 }]));
  });

  const withProviders = (ui: React.ReactNode) => {
    return render(<CartProvider>{ui}</CartProvider>);
  };

  test("renders header image", () => {
    withProviders(<Header />);
    expect(screen.getByAltText("Amazon Retail")).toBeInTheDocument();
  });

  test("renders search input", () => {
    withProviders(<Header />);
    expect(
      screen.getByPlaceholderText("Search for products...")
    ).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    withProviders(<Header />);
    const links = [
      "Home",
      "Products",
      "Cart (1)",
      "Profile",
      "Orders",
      "Logout",
    ];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test("renders cart correctly with items", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    );
    withProviders(<Header />);

    expect(screen.getByText("Cart (3)")).toBeInTheDocument();
  });

  test("renders cart correctly without items", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([])
    );
    withProviders(<Header />);

    expect(screen.getByText("Cart")).toBeInTheDocument();
  });
});
