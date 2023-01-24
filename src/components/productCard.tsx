import type { FC } from "react";
import type { productCardProps } from "../types/product";
import { formatCurrency } from "../utils/currencyFormat";
import Link from "next/link";
import { useShoppingCart } from "../context/ShoppingCartContext";

export const ProductCard: FC<productCardProps> = ({
  id,
  name,
  image,
  price,
}) => {
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <div className="h-full w-[450px] rounded-md border border-black md:w-[300px]">
      <Link href={`/product/[id]`} as={`/product/${name}`}>
        <div className="">
          <img src={image} className="h-[300px] object-fill" />
        </div>
      </Link>
      <div className="flex flex-col p-4">
        <div className="mb-4 flex items-baseline justify-between">
          <span className="text-2xl">{name}</span>
          <span className="space-x-2 text-xl">{formatCurrency(price)}</span>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => increaseCartQuantity(id)}
            className="w-full rounded bg-blue-600 px-3 py-2"
          >
            + Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

/*     <div className="m-3 h-80 rounded-md text-white transition-all hover:shadow-lg">
      <Link href={`/product/${name}`}>
        <div className="relative h-52">
          <Image
            src={image}
            fill
            alt="product image"
            unoptimized={true}
            className="rounded-md"
          />
        </div>
        <div className="px-2">
          <h1 className="md:text-md mt-4 text-base">{name}</h1>
          <p className="text-md mt-2">{price}€</p>
        </div>
      </Link>
    </div> */
