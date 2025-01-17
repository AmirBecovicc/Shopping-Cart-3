/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AppContext = createContext();

function ContextProvider({ children }) {
  const [productsInCart, setProductsInCart] = useState([]);
  const addToCart = (product) => {
    const newProducts = [
      ...productsInCart,
      { ...product, stock: product.stock - 1, quantity: 1 },
    ];
    setProductsInCart(newProducts);
    localStorage.setItem("productsInCart", JSON.stringify(newProducts));
  };

  const removeFromCart = (product) => {
    const newProducts = productsInCart.filter((item) => item.id !== product.id);
    setProductsInCart(newProducts);
    localStorage.setItem("productsInCart", JSON.stringify(newProducts));
  };

  const decrementProduct = (product) => {
    const newCartProducts = productsInCart.map((item) => {
      const matchProduct = product?.id === item?.id;
      if (!matchProduct) return item;
      else {
        return {
          ...item,
          quantity: item.quantity - 1,
          stock: item.stock + 1,
        };
      }
    });
    setProductsInCart(newCartProducts);
    localStorage.setItem("productsInCart", JSON.stringify(newCartProducts));
  };

  const incrementProduct = (product) => {
    const newCartProducts = productsInCart.map((item) => {
      const matchProduct = product?.id === item?.id;
      if (!matchProduct) return item;
      else {
        return {
          ...item,
          quantity: item.quantity + 1,
          stock: item.stock - 1,
        };
      }
    });
    setProductsInCart(newCartProducts);
    localStorage.setItem("productsInCart", JSON.stringify(newCartProducts));
  };

  const values = {
    productsInCart,
    setProductsInCart,
    addToCart,
    removeFromCart,
    decrementProduct,
    incrementProduct,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
