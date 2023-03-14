import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { formatCurrency } from "../utils/format";

interface SearchItemProps {
  name: string;
  url: string;
  image: string;
  price: number;
}

export const SearchItem: FC<SearchItemProps> = ({
  name,
  url,
  image,
  price,
}) => {
  return (
    <div>
      <div className="m-2">
        <Link href={`/product/[id]`} as={`/product/${url}`}>
          <div className="flex flex-row">
            <Image
              className="p-2"
              src={image}
              alt="product"
              height={150}
              width={150}
              unoptimized
            />
            <div className="flex flex-col p-2">
              <span>{name}</span>
              <span className="font-bold">{formatCurrency(price)}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
