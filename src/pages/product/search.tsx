import { useRouter } from "next/dist/client/router";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";

const Search: FC = () => {
  const router = useRouter();
  const queryString = router.query.query;

  return (
    <div>
      <div>{queryString}</div>
    </div>
  );
};

export default Search;
