import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import type { productCardProps } from "../types/product";

const ProductCard: FC<productCardProps> = ({ name, image, price }) => {
  return (
    <div className="m-3 rounded-md p-2 text-white shadow-xl">
      <Link href={`/product/${name}`}>
        <div className="relative h-36 md:h-44 lg:h-56 lg:w-32">
          <Image src={image} fill alt="product image" unoptimized={true} />
        </div>
        <div className="px-2">
          <h1 className="md:text-md mt-4 text-base">{name}</h1>
          <p className="text-md mt-2">{price}€</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
