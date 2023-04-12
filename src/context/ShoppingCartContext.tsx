import React, { createContext, useContext, type FC } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type {
  CartProviderProps,
  CartProps,
  ShoppingCartContext,
} from "../types/shoppingCart";

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartProps[]>(
    "shopping-cart",
    []
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const removeItem = (id: number) => {
    setCartItems((items) => {
      if ((items.find((item) => item.id === id)?.quantity as number) > 0) {
        return items.filter((item) => item.id !== id);
      } else {
        return items.map((item) => {
          return { ...item };
        });
      }
    });
  };

  const setItemQuantity = (id: number, quantity: number) => {
    setCartItems((items) => {
      if (items.find((item) => item.id === id) === null) {
        return [...items, { id, quantity: quantity }];
      } else {
        return items.map((item) => {
          return { ...item, quantity: (item.quantity = quantity) };
        });
      }
    });
  };

  const increaseCartQuantity = (id: number, price: number) => {
    setCartItems((items) => {
      if (items.find((item) => item.id === id) == null) {
        return [...items, { id, quantity: 1 }];
      } else {
        return items.map((item) => {
          if (
            item.id === id &&
            item.quantity < 25 &&
            price * item.quantity < 10000 - price
          ) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((items) => {
      if (items.find((item) => item.id === id)?.quantity === 1) {
        return items.filter((item) => item.id !== id);
      } else {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        cartQuantity,
        cartItems,
        clearCart,
        setItemQuantity,
        removeItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
