import { useRouter } from "next/dist/client/router";
import type { FC } from "react";
import { SearchItem } from "../../components/SearchItem";
import { trpc } from "../../utils/trpc";

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
          <SearchItem
            name={value.name}
            image={value.image}
            price={value.price}
          />
        </div>
      ))}
    </div>
  );
};

export default Search;
