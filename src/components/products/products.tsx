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
          <div key={key}>
            <div className="m-3 max-w-sm rounded-md text-black shadow-lg">
              <Link href={`product/${value.name}`}>
                <Image
                  src={value.image}
                  alt="product image"
                  height={250}
                  width={250}
                  layout={"responsive"}
                  unoptimized={true}
                />
                <div className="p-2 text-xs md:text-lg">
                  <h1 className="p-2 text-xl">{value.name}</h1>
                </div>
                <p className="p-2 text-lg">{value.price}€</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
