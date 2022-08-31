import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ShoppingCart = ({ items }: { items: any[] }) => {
  return (
    <ShoppingCartWrapper>
      <FontAwesomeIcon icon={faShoppingBasket} /> Cart ({items.length})
    </ShoppingCartWrapper>
  );
};

export default ShoppingCart;

const ShoppingCartWrapper = styled.div`
  margin-bottom: 20px;
`;
