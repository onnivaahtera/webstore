import { FC } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Custom404 from "../pages/404";
import { CartProps } from "../types/shoppingCart";
import { formatCurrency, totalPrice } from "../utils/currencyFormat";
import { trpc } from "../utils/trpc";

export const CartItem: FC<CartProps> = ({ id, quantity }) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const storeItems = trpc.product.productsInCart.useQuery({ id: id });
  const item = storeItems.data?.find((i) => i.id === id);
  if (!item) return <Custom404 />;

  if (item === null) return null;
  return (
    <div className="m-3 flex flex-row justify-between border-2 border-white py-2">
      <div className="flex flex-row items-center">
        <img
          src={item.image}
          alt="img"
          className="h-[75px] w-[125px] object-cover"
        />
        <div className="mx-5">{item.name} </div>
      </div>
      <div className="flex flex-row items-center">
        <button onClick={() => decreaseCartQuantity(id)}>-</button>
        <span className="px-2">{getItemQuantity(id)}</span>
        <button onClick={() => increaseCartQuantity(id)}>+</button>
      </div>
      <div className="m-2 flex flex-row items-center border border-purple-600">
        <div className="mx-7 p-2">
          <span>{formatCurrency(item.price)}</span>
        </div>
        <div className="p-2">
          <span className="font-bold">
            {formatCurrency(totalPrice(item.price, quantity))}
          </span>
        </div>
      </div>
    </div>
  );
};
