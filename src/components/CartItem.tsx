import { FC } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Custom404 from "../pages/404";
import { formatCurrency } from "../utils/currencyFormat";
import { trpc } from "../utils/trpc";

interface CartItemProps {
  id: number;
  quantity: number;
}

export const CartItem: FC<CartItemProps> = ({ id, quantity }) => {
  const {} = useShoppingCart();
  const storeItems = trpc.product.allProducts.useQuery();
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
        <div className="mx-5">
          {item.name}{" "}
          {quantity > 1 && <span className="text-sm">x{quantity}</span>}
        </div>
      </div>
      <div className="m-2 flex flex-row items-center border border-purple-600">
        <div className="p-2">
          <span>{formatCurrency(item.price)}</span>
        </div>
        <div className="p-2">
          <span className="font-bold">
            {formatCurrency(item.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};
