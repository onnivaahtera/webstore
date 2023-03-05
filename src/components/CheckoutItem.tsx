import { FC } from "react";
import { CartProps } from "../types/shoppingCart";
import { formatCurrency } from "../utils/currencyFormat";
import { trpc } from "../utils/trpc";

export const CheckoutItem: FC<CartProps> = ({ id, quantity }) => {
  const storeItems = trpc.cart.productsInCart.useQuery({ id: id });
  const item = storeItems.data?.find((i) => i.id === id);
  if (!item) return null;

  return (
    <div className="my-2 flex flex-row justify-between border-b border-t border-gray-500 py-2">
      <div>
        <span>
          {item.name} <span className="font-bold">x {quantity}</span>{" "}
        </span>
      </div>
      <div className="px-4">
        <span>{formatCurrency(item.price * quantity)}</span>
      </div>
    </div>
  );
};
