import React from "react";
import { trpc } from "../../utils/trpc";
import ProductCard from "./productCard";

function Products() {
  const products = trpc.product.allProducts.useQuery();

  return (
    <>
      <div className="m-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-10">
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
