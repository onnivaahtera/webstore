import type { NextPage } from "next";
import { ProductCard } from "../components/ProductCard";
import { trpc } from "../utils/trpc";
import Head from "next/head";

const Home: NextPage = () => {
  const products = trpc.product.allProducts.useQuery();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="flex items-center justify-center">
        <div className="grid grid-flow-row justify-center gap-2 sm:grid-cols-2 sm:justify-start md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products.data?.map((value) => (
            <div key={value.id}>
              <ProductCard {...value} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
