import { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import { Link } from "@reach/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RouteComponentProps } from "@reach/router";
import { navigate } from "@reach/router";

import ShoppingCart from "../components/shopping-cart";
import { CartContext } from "../App";

export const CATEGORIES_API_ENDPOINT =
  "https://fakestoreapi.com/products/categories";

const Categories = (props: RouteComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Array<any>>();
  const [error, setError] = useState<any>();
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("authToken") !== "fake-token") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        setIsLoading(true);
        const response = await fetch(CATEGORIES_API_ENDPOINT);
        const results = await response.json();
        setIsLoading(false);
        setCategories(results);
      };

      fetchCategories();
    } catch (error) {
      setError(error);
    }
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinnerContainer data-testid="loading-spinner">
        <CircularProgress />
      </LoadingSpinnerContainer>
    );
  }

  if (error) {
    <div>Something went wrong. Please contact support@primarybid.com</div>;
  }

  return (
    <>
      <Typography variant="h4" component="h4" mb={4}>
        Product Categories
      </Typography>

      <ShoppingCart items={cartContext.cart} />

      <Grid>
        {categories?.map((category: any) => {
          return (
            <StyledLink to={`/products/${category}`} key={category}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {category}
                  </Typography>
                </CardContent>
              </Card>
            </StyledLink>
          );
        })}
      </Grid>
    </>
  );
};

export default Categories;

const LoadingSpinnerContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
