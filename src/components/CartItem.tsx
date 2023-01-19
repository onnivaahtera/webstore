import { FC } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { trpc } from "../utils/trpc";

interface CartItemProps {
  id: number;
  quantity: number;
}

export const CartItem: FC<CartItemProps> = ({ id, quantity }) => {
  const {} = useShoppingCart();
  const storeItems = trpc.product.allProducts.useQuery();
  const item = storeItems.data?.find((i) => i.id === id);
  if (item === null) return null;
  return (
    <div className="flex items-center">
      <img
        src={item?.image}
        alt="img"
        className="h-[75px] w-[125px] object-cover"
      />
      <div className="mx-auto">
        {item?.name}{" "}
        {quantity > 1 && <span className="text-sm">x{quantity}</span>}
      </div>
    </div>
  );
};
