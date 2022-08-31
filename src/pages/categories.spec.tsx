import { render, screen, waitFor } from "@testing-library/react";
import Categories, { CATEGORIES_API_ENDPOINT } from "./categories";
import { mockCategories } from "../mocks/categories";
import fetchMock from "fetch-mock";

describe("categories page", () => {
  beforeEach(() => {
    render(<Categories />);
  });

  it("renders product categories", async () => {
    fetchMock.mock(CATEGORIES_API_ENDPOINT, mockCategories);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Product Categories")).toBeInTheDocument();
      expect(screen.getByText("electronics")).toBeInTheDocument();
      expect(screen.getByText("jewelery")).toBeInTheDocument();
      expect(screen.getByText("men's clothing")).toBeInTheDocument();
      expect(screen.getByText("women's clothing")).toBeInTheDocument();
    });
  });
});
