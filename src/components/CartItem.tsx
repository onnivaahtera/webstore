import type { FC } from "react";
import type { CartProps } from "../types/shoppingCart";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatter";
import { trpc } from "../utils/trpc";

export const CartItem: FC<CartProps> = ({ id, quantity }) => {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    setItemQuantity,
    removeItem,
  } = useShoppingCart();
  const storeItems = trpc.cart.productsInCart.useQuery({ id: id });
  const item = storeItems.data?.find((i) => i.id === id);
  if (!item) return <div>No items</div>;

  if (item === null) return null;

  return (
    <div className="my-5 flex flex-col border border-gray-600 bg-background2 p-5">
      <div className="flex justify-end">
        <button
          onClick={() => removeItem(id)}
          className="w-fit hover:text-red-500"
        >
          X
        </button>
      </div>
      <div className="flex flex-row lg:items-center lg:justify-center">
        <div className="mr-5 aspect-square w-24">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="w-full">
          <div>
            <span className="w-8">{item.name}</span>
          </div>
          <div className="my-4 flex flex-row items-center justify-between">
            <div>
              <button
                className="h-8 w-8 rounded-full border border-gray-600 hover:bg-red-600"
                onClick={() => decreaseCartQuantity(id)}
              >
                -
              </button>
              <input
                disabled
                name="quantity"
                value={quantity}
                onChange={(e) => setItemQuantity(id, parseInt(e.target.value))}
                type="text"
                className="mx-2 h-8 w-12 rounded-lg border border-gray-600 bg-inherit text-center"
              />
              <button
                className="h-8 w-8 rounded-full border border-gray-600 hover:bg-blue-600"
                onClick={() => increaseCartQuantity(id, item.price)}
              >
                +
              </button>
            </div>
            <div>
              {quantity > 1 ? (
                <div className="flex flex-col">
                  <span>{formatCurrency(item.price * quantity)}</span>
                  <span className="text-gray-500">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ) : (
                <span>{formatCurrency(item.price)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
