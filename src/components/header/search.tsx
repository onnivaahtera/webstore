import Link from "next/link";
import React from "react";
import { trpc } from "../../utils/trpc";

interface searchProps {
  input: string;
}

function SearchResults(props: searchProps) {
  const data = trpc.product.allProducts.useQuery();

  const filteredData = data.data?.filter((el) => {
    if (props.input === "") {
      return;
    } else {
      return el.name.includes(props.input);
    }
  });

  return (
    <ul className="flex justify-center">
      {filteredData?.map((item) => (
        <Link href={`/product/${item.name}`} key={item.id}>
          <p className="m-2 flex w-fit items-center text-white hover:underline">
            {item.name}
          </p>
        </Link>
      ))}
    </ul>
  );
}

export default SearchResults;
