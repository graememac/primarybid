import { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RouteComponentProps } from "@reach/router";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { navigate } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import ShoppingCart from "../components/shopping-cart";
import { CartContext } from "../App";

export const getAPIEndpoint = (category: string) =>
  `https://fakestoreapi.com/products/category/${category}`;

const Products = ({
  category,
}: RouteComponentProps & { category?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Array<any>>();
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
        if (category) {
          setIsLoading(true);
          const response = await fetch(getAPIEndpoint(category));
          const results = await response.json();
          setIsLoading(false);
          setProducts(results);
        }
      };

      fetchCategories();
    } catch (error) {
      setError(error);
    }
  }, []);

  const addItem = (item: any) => {
    cartContext.setCart([...cartContext.cart, item]);
  };

  const removeItem = (item: any) => {
    cartContext.setCart(
      cartContext.cart.filter((cartItem) => cartItem.id !== item.id)
    );
  };

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
        <BackButton href="javascript:history.back()">
          <FontAwesomeIcon icon={faAngleLeft} />
        </BackButton>
        {category}
      </Typography>

      <ShoppingCart items={cartContext.cart} />

      <Grid>
        {products?.map((product: any) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={product.id}>
              <CardMedia component="img" height="140" image={product.image} />
              <CardContent>
                <Typography variant="subtitle1" component="div">
                  <TitleWrapper>{product.title}</TitleWrapper>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => addItem(product)}>
                  Add to cart
                </Button>
                <Button size="small" onClick={() => removeItem(product)}>
                  Remove all
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </>
  );
};

export default Products;

const LoadingSpinnerContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TitleWrapper = styled.div`
  min-height: 115px;
`;

const BackButton = styled.a`
  text-decoration: none;
  display: inline-block;
  color: black;
  margin-right: 40px;
  font-size: 28px;
`;
