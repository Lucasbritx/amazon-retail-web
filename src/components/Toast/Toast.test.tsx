import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toast from "./Toast";
import { TOAST_TYPES } from "@/constants/TOAST_TYPES";

const mockToastProps = {
  title: "Test Title",
  description: "Test Description",
  duration: 3000,
  type: TOAST_TYPES.SUCCESS,
  onClose: jest.fn(),
  isOpen: true,
};

describe("Toast Component", () => {
  test("renders toast element", () => {
    render(<Toast {...mockToastProps} />);
    const toastElement = screen.getByRole("toast");
    expect(toastElement).toBeInTheDocument();
  });
  test("not renders toast element", () => {
    render(<Toast {...mockToastProps} isOpen={false} />);
    const toastElement = screen.queryByRole("toast");
    expect(toastElement).not.toBeInTheDocument();
  });
  test("renders toast element with the title correctly", () => {
    render(<Toast {...mockToastProps} />);
    const titleElement = screen.getByText(mockToastProps.title);
    expect(titleElement).toBeInTheDocument();
  });
  test("renders toast element with the description correctly", () => {
    render(<Toast {...mockToastProps} />);
    const descriptionElement = screen.getByText(mockToastProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });
  test("renders toast element with the error type correctly", () => {
    render(<Toast {...mockToastProps} type={TOAST_TYPES.ERROR} />);
    const toastElement = screen.getByRole("toast");
    expect(toastElement).toHaveClass("bg-red-500");
  });
  test("renders toast element with the success type correctly", () => {
    render(<Toast {...mockToastProps} type={TOAST_TYPES.SUCCESS} />);
    const toastElement = screen.getByRole("toast");
    expect(toastElement).toHaveClass("bg-green-500");
  });
  test("renders toast element with the info type correctly", () => {
    render(<Toast {...mockToastProps} type={TOAST_TYPES.INFO} />);
    const toastElement = screen.getByRole("toast");
    expect(toastElement).toHaveClass("bg-blue-500");
  });
});
