import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import type { FC } from "react";
import { SearchItem } from "../../components/SearchItem";
import { trpc } from "../../utils/trpc";

const Search: FC = () => {
  const router = useRouter();
  const queryString = router.query.search;

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
          <div key={key}>
            <SearchItem {...value} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
