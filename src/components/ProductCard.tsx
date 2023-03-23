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
        <div className="aspect-square h-full overflow-hidden rounded-lg bg-white ">
          <img src={image} alt={name} />
        </div>
        <h3 className="mt-4 h-14 text-sm lg:h-20">{name}</h3>
        <p className="mt-2 text-lg font-medium">{formatCurrency(price)}</p>
      </a>
      <Button
        type="button"
        onClick={() => increaseCartQuantity(id, price)}
        className="relative bottom-0 mt-2 h-10 w-32"
      >
        Add to cart
      </Button>
    </div>
  );
};
