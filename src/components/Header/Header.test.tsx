import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([{ id: 1 }]));
  });

  test("renders header image", () => {
    render(<Header />);
    expect(screen.getByAltText("Amazon Retail")).toBeInTheDocument();
  });

  test("renders search input", () => {
    render(<Header />);
    expect(
      screen.getByPlaceholderText("Search for products...")
    ).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(<Header />);
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
    render(<Header />);

    expect(screen.getByText("Cart (3)")).toBeInTheDocument();
  });

  test("renders cart correctly without items", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([])
    );
    render(<Header />);

    expect(screen.getByText("Cart")).toBeInTheDocument();
  });
});
