import React, { createContext, useContext, FC } from "react";
import { CartProviderProps } from "../types/shoppingCart";
type ShoppingCartContext = {};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: FC<CartProviderProps> = ({ children }) => {
  return (
    <ShoppingCartContext.Provider value={}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
