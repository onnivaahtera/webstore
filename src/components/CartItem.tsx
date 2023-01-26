import { FC } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartProps } from "../types/shoppingCart";
import { formatCurrency, totalPrice } from "../utils/currencyFormat";
import { trpc } from "../utils/trpc";

export const CartItem: FC<CartProps> = ({ id, quantity }) => {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const storeItems = trpc.cart.productsInCart.useQuery({ id: id });
  const item = storeItems.data?.find((i) => i.id === id);
  if (!item) return <div>No items</div>;

  if (item === null) return null;

  return (
    <div className="border-t border-b border-gray-700 p-2">
      <span>{item.name}</span>
      <div className="flex flex-row justify-between">
        <img src={item.image} className="h-[25px]" alt="" />
        <div className="flex justify-start">
          <button onClick={() => decreaseCartQuantity(id)}>-</button>
          <span className="m-2 h-6 w-10 rounded border border-gray-500 text-center">
            {quantity}
          </span>
          <button onClick={() => increaseCartQuantity(id, item.price)}>
            +
          </button>
        </div>

        <div className="flex flex-row items-center justify-center">
          <span className="mx-2">{formatCurrency(item.price)}</span>
          <span className="mx-2">
            {formatCurrency(totalPrice(item.price, quantity))}
          </span>
        </div>
      </div>
    </div>
  );
};
