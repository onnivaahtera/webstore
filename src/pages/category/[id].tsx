import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

import { trpc } from "../../utils/trpc";
import Link from "next/link";

function Category() {
  const router = useRouter();
  const { id } = router.query;

  const products = trpc.product.productsInCategory.useQuery({
    category: `${id}`,
  });

  return (
    <>
      <div>
        <div className="3xl:grid-cols-10 m-5 grid grid-cols-2 p-2 md:grid-cols-5 2xl:grid-cols-7">
          {products.data?.map((value, key) => (
            <div
              className="m-3 max-w-sm rounded-md border-2 border-slate-800 bg-slate-800 text-center text-white shadow-lg"
              key={key}
            >
              <Link href={`/product/${value.name}`}>
                <Image
                  src={value.image}
                  alt="product image"
                  height={250}
                  width={250}
                  layout={"responsive"}
                  unoptimized={true}
                />
                <div className="p-2 text-xs md:text-lg">
                  <h1>{value.name}</h1>
                  <p className="py-2">{value.price}€</p>
                </div>
              </Link>
              <p>
                <button className="w-full rounded-md bg-slate-900 p-3 text-white">
                  Add to Cart
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
