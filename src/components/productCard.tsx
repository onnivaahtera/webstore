import type { FC } from "react";
import type { productCardProps } from "../types/product";
import { formatCurrency, totalPrice } from "../utils/currencyFormat";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useShoppingCart } from "../context/ShoppingCartContext";

export const ProductCard: FC<productCardProps> = ({
  id,
  name,
  image,
  price,
  url,
}) => {
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <div className="m-2 w-[250px] p-2 hover:shadow-lg">
      <Link href={"/product/[id]"} as={`/product/${url}`}>
        <img src={image} alt="" className="h-[250px]" />
        <span>{name}</span>
      </Link>
      <div className="flex flex-row items-center justify-between">
        <span className="py-4 text-lg">{formatCurrency(price)}</span>
        <button
          onClick={() => increaseCartQuantity(id, price)}
          className="flex h-12 w-12 items-center justify-center rounded bg-blue-700"
        >
          <MdShoppingCart className="text-3xl" />
        </button>
      </div>
    </div>
  );
};
