import { render, screen } from "@testing-library/react";
import ShoppingCart from "./shopping-cart";

import { mockProducts } from "../mocks/products";

describe("shopping cart", () => {
  it("renders an empty cart", () => {
    render(<ShoppingCart items={[]} />);

    expect(screen.getByText("Cart (0)")).toBeInTheDocument();
  });

  it("renders a cart with one item", () => {
    render(<ShoppingCart items={[mockProducts[0]]} />);

    expect(screen.getByText("Cart (1)")).toBeInTheDocument();
  });

  it("renders a cart with multiple items", () => {
    render(<ShoppingCart items={mockProducts} />);

    expect(screen.getByText("Cart (4)")).toBeInTheDocument();
  });
});
