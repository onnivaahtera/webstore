import { useRouter } from "next/dist/client/router";
import type { FC } from "react";

const Search: FC = () => {
  const router = useRouter();
  return <div>{router.query.query}</div>;
};

export default Search;
