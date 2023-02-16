import { ReactNode } from "react";
import z from "zod";

export interface CartProviderProps {
  children: ReactNode;
}

const CartProps = z.object({
  id: z.number(),
  quantity: z.number(),
});

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
  email: z.string(),
  phone: z.string(),
  fname: z.string(),
  lname: z.string(),
  streetAddress: z.string(),
  streetNumber: z.string(),
  city: z.string(),
  postalcode: z.string(),
  product: z.array(CartProps),
});

export type orderType = z.infer<typeof order>;

export type CartProps = z.infer<typeof CartProps>;
