import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewProduct from "./page";
import { ToastProvider } from "@/components/Toast/ToastContext";
import { act } from "react";

describe("NewProduct Page", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it("renders form with default values", () => {
    render(
      <ToastProvider>
        <NewProduct />
      </ToastProvider>
    );
    expect(screen.getByLabelText(/name/i)).toHaveValue("Kindle");
    expect(screen.getByLabelText(/price/i)).toHaveValue(1);
    expect(screen.getByLabelText(/image url/i)).toHaveValue(
      "https://m.media-amazon.com/images/G/32/kindle/journeys/mdTfy5FzV17nneXV/NDQyODI5YWQt._CB545036651_.jpg"
    );
  });
  it("shows validation errors when fields are empty", async () => {
    render(
      <ToastProvider>
        <NewProduct />
      </ToastProvider>
    );
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Price is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Image is required/i)).toBeInTheDocument();
    });
  });
  it("shows error for invalid image URL", async () => {
    render(
      <ToastProvider>
        <NewProduct />
      </ToastProvider>
    );
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: "Invalid url" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Image is required/i)).toBeInTheDocument();
    });
  });
  it("submits form with valid data", async () => {
    render(
      <ToastProvider>
        <NewProduct />
      </ToastProvider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "Kindle" },
      });
      fireEvent.change(screen.getByLabelText(/price/i), {
        target: { value: 1 },
      });
      fireEvent.change(screen.getByLabelText(/image url/i), {
        target: {
          value:
            "https://m.media-amazon.com/images/G/32/kindle/journeys/mdTfy5FzV17nneXV/NDQyODI5YWQt._CB545036651_.jpg",
        },
      });

      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole("paragraph")).toHaveTextContent(
        "Product created successfully!"
      );
    });
  });
  it("logs error when fetch fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Fetch failed"))
    ) as jest.Mock;

    render(
      <ToastProvider>
        <NewProduct />
      </ToastProvider>
    );

    act(() => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "Kindle" },
      });
      fireEvent.change(screen.getByLabelText(/price/i), {
        target: { value: 1 },
      });
      fireEvent.change(screen.getByLabelText(/image url/i), {
        target: {
          value:
            "https://m.media-amazon.com/images/G/32/kindle/journeys/mdTfy5FzV17nneXV/NDQyODI5YWQt._CB545036651_.jpg",
        },
      });

      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole("paragraph")).toHaveTextContent(
        "Error creating product"
      );
    });
  });
});
