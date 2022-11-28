import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";

const Product: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const product = trpc.product.getProduct.useQuery({ url: `${id}` });

  if (!product.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{product.data?.[0]?.name}</title>
      </Head>

      <div className="product-wrapper flex">
        <div className="product-image mx-32 mt-16 rounded-md">
          <Image
            src={`${product.data?.[0]?.image}`}
            alt="product image"
            width={400}
            height={400}
            unoptimized={true}
          />
        </div>
        <div className="flex-col">
          <div className="product-name p-2">
            <div className="h-14 w-44 rounded-md p-2 text-3xl">
              <p>{product.data?.[0]?.name}</p>
            </div>
          </div>
          <div className="product-price px-2">
            <div className="h-18 w-44 rounded-md">
              <div className="p-2">
                <p className="text-2xl">{product.data?.[0]?.price}€</p>
                <p className="text-xs text-gray-500">includes vat. 24%</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <button>
              <div className="h-10 w-36 rounded bg-blue-500 p-2 text-white shadow-md shadow-blue-500">
                Add to cart
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="text-center text-white">
        <h2 className="m-6 text-2xl ">Description</h2>
        <div className="text-lg">{product.data?.[0]?.desc}</div>
      </div>
    </>
  );
};

export default Product;
