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

  return (
    <>
      <Head>
        <title>{queryString}</title>
      </Head>
      <div className="mx-32">
        {searchResults.data?.map((value, key) => (
          <div key={key}>
            <SearchItem
              name={value.name}
              url={value.url}
              image={value.image}
              price={value.price}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
