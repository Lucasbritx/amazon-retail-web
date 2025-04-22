import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewProduct from "./page";

describe("Card Component", () => {
  it("renders form with default values", () => {
    render(<NewProduct />);
    expect(screen.getByLabelText(/name/i)).toHaveValue("Kindle");
    expect(screen.getByLabelText(/price/i)).toHaveValue(1);
    expect(screen.getByLabelText(/image url/i)).toHaveValue(
      "https://m.media-amazon.com/images/G/32/kindle/journeys/mdTfy5FzV17nneXV/NDQyODI5YWQt._CB545036651_.jpg"
    );
  });
  it("shows validation errors when fields are empty", async () => {
    render(<NewProduct />);

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
});
