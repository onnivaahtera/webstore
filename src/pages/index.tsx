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
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="">
        <div>
          <div className="">
            {products.data?.map((value) => (
              <div key={value.id}>
                <ProductCard {...value} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
