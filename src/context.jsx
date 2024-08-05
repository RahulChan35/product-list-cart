/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { data } from "./data";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const AppContext = ({ children }) => {
  const [productData, setProductData] = useState(null);
  const [cart, setCart] = useState([]);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);

  useEffect(() => {
    setProductData(data);
  }, []);

  const addToCart = (id) => {
    const dessert = productData.find((dessert) => dessert.id === id);
    setCart((previousCart) => {
      let isFound = false;
      previousCart.map((des) => {
        if (des.id === dessert.id) {
          isFound = true;
        }
      });
      if (isFound) {
        dessert.cartCount++;
      } else {
        dessert.cartCount = 1;
      }
      dessert.subTotal = dessert.cartCount * dessert.price;
      return isFound ? [...previousCart] : [...previousCart, dessert];
    });
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((dessert) => dessert.id !== id);
    setProductData((previousProductData) => {
      let isFound = false;
      previousProductData.map((product) => {
        if (id === product.id) {
          isFound = true;
        }
        if (isFound) {
          product.cartCount = 0;
        }
      });
      return [...previousProductData];
    });
    setCart(newCart);
  };

  const decrementQuantity = (id) => {
    let isOne = false;
    setCart((previousCart) => {
      let newCart = [];
      previousCart.map((dessert) => {
        if (dessert.id === id) {
          if (dessert.cartCount == 1) {
            isOne = true;
            newCart = cart.filter((des) => des.id !== id);
          } else {
            dessert.cartCount--;
            dessert.subTotal -= dessert.price;
          }
        }
      });
      return isOne ? newCart : [...previousCart];
    });
    setProductData((previousProductData) => {
      previousProductData.map((dessert) => {
        if (dessert.id === id && isOne) {
          dessert.cartCount--;
        }
      });
      return [...previousProductData];
    });
  };

  const toggleConfirmOrder = () => {
    setShowConfirmOrder(!showConfirmOrder);
  };

  return (
    <GlobalContext.Provider
      value={{
        productData,
        cart,
        addToCart,
        setProductData,
        setCart,
        removeFromCart,
        decrementQuantity,
        showConfirmOrder,
        toggleConfirmOrder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
