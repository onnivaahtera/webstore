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
    <div className="m-3 h-64 max-w-sm rounded-md p-2 text-black shadow-lg">
      <Link href={`/product/${name}`}>
        <Image
          src={image}
          alt="product image"
          height={250}
          width={250}
          layout={"responsive"}
          unoptimized={true}
        />
        <div className="p-2 text-xs md:text-lg">
          <h1 className="p-2 text-xl">{name}</h1>
        </div>
        <p className="p-2 text-lg">{price}€</p>
      </Link>
    </div>
  );
};

export default ProductCard;
