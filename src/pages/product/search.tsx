import { useRouter } from "next/dist/client/router";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

const Search: FC = () => {
  const router = useRouter();
  const queryString = router.query.query;

  const searchResults = trpc.product.searchProducts.useQuery({
    query: `${queryString}`,
  });

  return (
    <div>
      {searchResults.data?.map((value, key) => (
        <div key={key}>
          <div className="m-2">
            <Link href={`/product/${value.name}`}>
              <div className="flex flex-row">
                <Image
                  className="p-2"
                  src={value.image}
                  alt="product"
                  height={150}
                  width={150}
                  unoptimized
                />
                <div className="p-2">{value.name}</div>
                <div className="p-2">{value.price} €</div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
