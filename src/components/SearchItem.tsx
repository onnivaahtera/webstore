import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

interface SearchItemProps {
  name: string;
  image: string;
  price: number;
}

export const SearchItem: FC<SearchItemProps> = ({ name, image, price }) => {
  return (
    <div>
      <div className="m-2">
        <Link href={`/product/[id]`} as={`/product/${name}`}>
          <div className="flex flex-row">
            <Image
              className="p-2"
              src={image}
              alt="product"
              height={150}
              width={150}
              unoptimized
            />
            <div className="p-2">{name}</div>
            <div className="p-2">{price} €</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
