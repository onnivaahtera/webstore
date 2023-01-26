import { ReactNode } from "react";

export interface CartProviderProps {
  children: ReactNode;
}

export type CartProps = {
  id: number;
  quantity: number;
};

export type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  clearCart: (cartItems: CartProps[]) => void;
  cartQuantity: number;
  cartItems: CartProps[];
  addToCart: (id: number, price: number) => void;
};
