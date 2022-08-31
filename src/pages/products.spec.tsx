import { render, screen, waitFor } from "@testing-library/react";
import Products, { getAPIEndpoint } from "./products";
import { mockProducts } from "../mocks/products";
import fetchMock from "fetch-mock";

describe("products page", () => {
  beforeEach(() => {
    render(<Products category="jewelery" />);
  });

  it("renders products", async () => {
    fetchMock.mock(getAPIEndpoint("jewelery"), mockProducts);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("jewelery")).toBeInTheDocument();
      expect(
        screen.getByText(
          "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("Solid Gold Petite Micropave")
      ).toBeInTheDocument();
    });
  });
});
