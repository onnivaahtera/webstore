import React from "react";
import { useRouter } from "next/router";
import { ProductCard } from "../../components/ProductCard";
import { trpc } from "../../utils/trpc";

function Category() {
  const router = useRouter();
  const { slug } = router.query;

  const products = trpc.product.productsInCategory.useQuery({
    category: `${slug}`,
  });

  return (
    <main className="flex items-center justify-center">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.data?.map((value) => (
            <div key={value.id} className="p-3">
              <ProductCard {...value} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Category;
