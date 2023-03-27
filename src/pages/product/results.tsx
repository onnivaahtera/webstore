import type { FC } from "react";
import { useRouter } from "next/dist/client/router";
import { formatCurrency } from "../../utils/formatter";
import { trpc } from "../../utils/trpc";
import { Button } from "../../components/ui/Button";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { MdShoppingCart } from "react-icons/md";
import Head from "next/head";
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
        <title>Search results</title>
      </Head>
      <div>
        {searchResults.data?.map((item) => (
          <div
            key={item.id}
            className="my-2 flex flex-row items-center justify-between rounded border border-gray-600 p-2"
          >
            <Link href={"/product/[id]"} as={`/product/${item.url}`}>
              <div className="flex flex-row items-center justify-between p-2">
                <img
                  src={item.image}
                  alt=""
                  className="mr-2 h-[60px] w-[60px]"
                />
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span>{formatCurrency(item.price)}</span>
                </div>
              </div>
            </Link>
            <Button
              type="button"
              className="h-fit w-fit p-2"
              onClick={() => increaseCartQuantity(item.id, item.price)}
            >
              <MdShoppingCart className="text-3xl" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
