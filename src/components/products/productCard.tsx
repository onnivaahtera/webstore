import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface productCardProps {
  name: string;
  image: string;
  price: number;
}

const ProductCard: FC<productCardProps> = ({ name, image, price }) => {
  return (
    <div className="m-3 h-64 rounded-md p-2 text-white shadow-lg">
      <Link href={`/product/${name}`}>
        <Image
          src={image}
          alt="product image"
          height={250}
          width={250}
          layout={"responsive"}
          unoptimized={true}
        />
        <div className="px-2">
          <h1 className="md:text-md mt-8 text-base">{name}</h1>
          <p className="text-md mt-2">{price}€</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
