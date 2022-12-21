import { useRouter } from "next/dist/client/router";
import type { FC } from "react";
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
          <div className="flex">
            <div className="p-2">{value.name}</div>
            <div className="p-2">{value.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
