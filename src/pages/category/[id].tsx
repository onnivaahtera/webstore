import { useRouter } from "next/router";
import React from "react";
import ProductCard from "../../components/productCard";
import { trpc } from "../../utils/trpc";

function Category() {
  const router = useRouter();
  const { id } = router.query;

  const products = trpc.product.productsInCategory.useQuery({
    category: `${id}`,
  });

  return (
    <main>
      <div className="m-3 grid grid-cols-2 md:grid-cols-4">
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
    </main>
  );
}

export default Category;
