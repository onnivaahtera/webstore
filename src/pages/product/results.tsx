import type { FC } from "react";
import { useRouter } from "next/dist/client/router";
import { formatCurrency } from "../../utils/formatter";
import { trpc } from "../../utils/trpc";
import { Button } from "../../components/ui/Button";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { MdShoppingCart } from "react-icons/md";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Search: FC = () => {
  const router = useRouter();
  const queryString = router.query.search;
  const { increaseCartQuantity } = useShoppingCart();
  const searchResults = trpc.product.searchProducts.useQuery({
    query: `${queryString}`,
  });

  if (searchResults.data?.length === 0)
    return <div className="my-12 text-center text-3xl">Products not found</div>;

  return (
    <>
      <Head>
        <title>{queryString}</title>
      </Head>
      <div className="mx-32">
        {searchResults.data?.map((value, key) => (
          <div className="m-2 flex flex-row bg-background2 p-3" key={key}>
            <Link href={`/product/[id]`} as={`/product/${value.url}`}>
              <div className="flex flex-row">
                <Image
                  src={value.image}
                  alt="product"
                  height={150}
                  width={150}
                  unoptimized
                />
                <div className="ml-5 flex flex-col p-2">
                  <span>{value.name}</span>
                  <span className="font-bold">
                    {formatCurrency(value.price)}
                  </span>
                </div>
              </div>
            </Link>
            <div className="">
              <Button
                type="button"
                className="h-[50px] w-[50px] p-2"
                onClick={() => increaseCartQuantity(value.id, value.price)}
              >
                <MdShoppingCart className="text-3xl" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
