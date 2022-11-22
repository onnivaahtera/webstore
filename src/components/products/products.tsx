import Image from "next/image";
import Link from "next/link";
import React from "react";
import { trpc } from "../../utils/trpc";

function Products() {
  const products = trpc.product.allProducts.useQuery();

  return (
    <>
      <div className=" 3xl:grid-cols-10 m-5 grid grid-cols-2 p-2 md:grid-cols-5 2xl:grid-cols-7">
        {products.data?.map((value, key) => (
          <div
            className="m-3 max-w-sm rounded-md border-2 border-slate-800 bg-slate-800 text-center text-white shadow-lg"
            key={key}
          >
            <Link href={`product/${value.name}`}>
              <a>
                <Image
                  src={value.image}
                  alt="product image"
                  height={250}
                  width={250}
                  layout={"responsive"}
                  unoptimized={true}
                />
                <div className="p-2 text-xs md:text-lg">
                  <h1 className="hover:underline">{value.name}</h1>
                </div>
              </a>
            </Link>
            <p className="py-1 text-xl">{value.price}€</p>
            <p>
              <button className="w-full rounded-md bg-slate-900 p-3 text-white">
                Add to Cart
              </button>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
