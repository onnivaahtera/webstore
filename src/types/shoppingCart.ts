import { ReactNode } from "react";
import { updateUserSchema } from "./user";
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

export const order = updateUserSchema.extend({
  cardNumber: z.number(),
  cvc: z.number(),
  expirationDate: z.string(),
});

export type CartProps = z.infer<typeof CartProps>;
export type order = z.infer<typeof order>;
