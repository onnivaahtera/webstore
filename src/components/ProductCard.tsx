import type { FC } from "react";
import type { productCardProps } from "../types/product";
import { formatCurrency } from "../utils/formatter";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button } from "./ui/Button";

export const ProductCard: FC<productCardProps> = ({
  id,
  name,
  image,
  price,
  url,
}) => {
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <div>
      <a href={`/product/${url}`}>
        <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm">{name}</h3>
        <p className="mt-1 text-lg font-medium">{formatCurrency(price)}</p>
      </a>
      <Button
        type="button"
        onClick={() => increaseCartQuantity(id, price)}
        className="mt-2 h-10 w-32"
      >
        Add to cart
      </Button>
    </div>
  );
};
