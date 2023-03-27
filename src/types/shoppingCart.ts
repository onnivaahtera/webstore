import type { ReactNode } from "react";
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
  clearCart: () => void;
  cartQuantity: number;
  cartItems: CartProps[];
  setItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

export const order = updateUserSchema.extend({
  cardNumber: z.string(),
  cvc: z.string(),
  expirationDate: z.string(),
  cartItems: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
    })
  ),
  date: z.date(),
});

export type CartProps = z.infer<typeof CartProps>;
export type order = z.infer<typeof order>;
