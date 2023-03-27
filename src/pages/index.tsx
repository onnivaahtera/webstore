import type { NextPage } from "next";
import { ProductCard } from "../components/ProductCard";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import Image from "next/image";
import hero1 from "../../public/images/hero1.jpg";
import hero2 from "../../public/images/hero2.jpg";

const Home: NextPage = () => {
  const products = trpc.product.allProducts.useQuery();

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>

      <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <Image src={hero2} alt="hero" width={800} />
        </div>

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
      </div>
    </>
  );
};

export default Home;
