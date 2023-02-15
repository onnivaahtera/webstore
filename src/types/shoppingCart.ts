import { ReactNode } from "react";
import z from "zod";

export interface CartProviderProps {
  children: ReactNode;
}

export type CartProps = {
  id: number;
  quantity: number;
};

export type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number, price: number) => void;
  decreaseCartQuantity: (id: number) => void;
  clearCart: (cartItems: CartProps[]) => void;
  cartQuantity: number;
  cartItems: CartProps[];
};

const payment = z.object({
  cardNumber: z.string(),
  cvc: z.string(),
  expirationDate: z.string(),
});

export const order = payment.extend({
  fname: z.string(),
  lname: z.string(),
  streetAddress: z.string(),
  streetNumber: z.string(),
  city: z.string(),
  postalcode: z.string(),
  email: z.string(),
  phone: z.string(),
});

export type orderType = z.infer<typeof order>;
