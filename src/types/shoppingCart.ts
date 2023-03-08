import { ReactNode } from "react";
import { updateUserSchema } from "./user";
import z, { number } from "zod";

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
  cardNumber: z.string(),
  cvc: z.string(),
  expirationDate: z.string(),
  cartItems: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
    })
  ),
});

export type CartProps = z.infer<typeof CartProps>;
export type order = z.infer<typeof order>;
