import React from "react";
import { trpc } from "../../utils/trpc";
import ProductCard from "./productCard";

function Products() {
  const products = trpc.product.allProducts.useQuery();

  return (
    <>
      <div className=" 3xl:grid-cols-10 m-5 grid grid-cols-2 p-2 md:grid-cols-5 2xl:grid-cols-7">
        {products.data?.map((value, key) => (
          <div key={key}>
            <ProductCard
              name={value.name}
              image={value.image}
              price={value.price}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
