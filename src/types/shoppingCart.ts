import { ReactNode } from "react";

export interface CartProviderProps {
  children: ReactNode;
}

export type CartItemProps = {
  id: number;
  quantity: number;
};

export type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  clearCart: (cartItems: CartItemProps[]) => void;
  cartQuantity: number;
  cartItems: CartItemProps[];
};
