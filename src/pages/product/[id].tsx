import { useRouter } from "next/router";
import type { FC } from "react";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Head from "next/head";

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

      <div className="product-wrapper flex items-center justify-center">
        <div className="product-image mt-16  rounded-md bg-slate-900">
          <Image
            src={`${product.data?.[0]?.image}`}
            alt="product image"
            width={300}
            height={300}
            unoptimized={true}
          />
        </div>
        <div className="flex-col">
          <div className="product-name p-2">
            <div className="h-14 w-44 rounded-md bg-slate-800 p-2 text-3xl text-white">
              <p>{product.data?.[0]?.name}</p>
            </div>
          </div>
          <div className="product-price px-2">
            <div className="h-18 w-44 rounded-md bg-slate-800 text-white">
              <div className="p-2">
                <p className="text-2xl">{product.data?.[0]?.price}€</p>
                <p className="text-xs text-white">includes vat. 24%</p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <div className="w-32 rounded-sm bg-slate-800 p-2 text-white">
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
