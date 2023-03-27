import { useRouter } from "next/router";
import { type FC } from "react";
import { ProductCard } from "../../components/ProductCard";
import { trpc } from "../../utils/trpc";

const Category: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const products = trpc.product.productsInCategory.useQuery({
    category: `${id}`,
  });

  return (
    <main className="flex items-center justify-center">
      <div className="mx-auto max-w-2xl py-14 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.data?.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-500 p-1 hover:-translate-y-1 hover:border-none hover:shadow-2xl"
            >
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Category;
