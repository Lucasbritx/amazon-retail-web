import { render, screen, fireEvent } from "@testing-library/react";
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
});
