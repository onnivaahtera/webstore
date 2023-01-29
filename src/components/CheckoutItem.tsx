import { FC } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/currencyFormat";
import { trpc } from "../utils/trpc";

interface CheckoutItemProps {
  id: number;
  quantity: number;
}

export const CheckoutItem: FC<CheckoutItemProps> = ({ id, quantity }) => {
  const storeItems = trpc.cart.productsInCart.useQuery({ id: id });
  const item = storeItems.data?.find((i) => i.id === id);
  if (!item) return null;

  const x = storeItems.data;
  if (!x) return null;

  const getTotal = () => {
    const sum = x
      .map((a) => a.price * quantity)
      .reduce((a, b) => {
        return a + b;
      });
    return sum;
  };

  return (
    <div className="flex flex-row justify-between py-2">
      <div>
        <span>
          {item.name} <span>x {quantity}</span>{" "}
        </span>
      </div>
      <div className="mx-10">
        <span>{formatCurrency(getTotal())}</span>
      </div>
    </div>
  );
};
