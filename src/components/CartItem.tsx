import { FC } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartProps } from "../types/shoppingCart";
import { formatCurrency } from "../utils/formatter";
import { trpc } from "../utils/trpc";

export const CartItem: FC<CartProps> = ({ id, quantity }) => {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const storeItems = trpc.cart.productsInCart.useQuery({ id: id });
  const item = storeItems.data?.find((i) => i.id === id);
  if (!item) return <div>No items</div>;

  if (item === null) return null;

  return (
    <div className="border-t border-b border-gray-700 p-2">
      <div className="flex flex-row py-2">
        <div>
          <img src={item.image} className="w-[75px]" alt="" />
        </div>
        <span className="mx-4 w-[100px]">{item.name}</span>
        <div className="flex items-center justify-center">
          <button onClick={() => decreaseCartQuantity(id)} className="pr-2">
            -
          </button>
          <span className="rounded border border-gray-500 px-2">
            {quantity}
          </span>
          <button
            onClick={() => increaseCartQuantity(id, item.price)}
            className="pl-2"
          >
            +
          </button>
          <span className="px-2">{formatCurrency(item.price * quantity)}</span>
        </div>
      </div>
    </div>
  );
};
