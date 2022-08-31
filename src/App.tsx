import "./App.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { createContext, useState } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { config } from "@fortawesome/fontawesome-svg-core";
import SignIn from "./pages/sign-in";
import Categories from "./pages/categories";
import Products from "./pages/products";
config.autoAddCss = false;

type Cart = {
  cart: any[];
  setCart: any;
};

export const CartContext = createContext<Cart>({ cart: [], setCart: () => {} });

const App: React.FC<RouteComponentProps> = () => {
  const [cart, setCart] = useState<any[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Router>
        <SignIn path="/" />
        <Categories path="/categories" />
        <Products path="/products/:category" />
        <SignIn default />
      </Router>
    </CartContext.Provider>
  );
};

export default App;
