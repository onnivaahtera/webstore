import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/currencyFormat";
import { trpc } from "../../utils/trpc";
import Custom404 from "../404";

const Product: FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { increaseCartQuantity } = useShoppingCart();

  const product = trpc.product.getProduct.useQuery({ url: `${slug}` });

  if (!product.data) {
    return <div>Loading...</div>;
  }

  const item = product.data[0];

  if (!item) return <Custom404 />;

  return (
    <>
      <Head>
        <title>{item.name}</title>
      </Head>
      <main className="p-3">
        <div>
          <img src={item.image} alt="" className="pb-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl">{item.name}</span>
          <span className="text-lg">{formatCurrency(item.price)}</span>
          <div>
            <button
              className="h-[50px] w-[150px] rounded bg-blue-800 text-lg"
              onClick={() => increaseCartQuantity(item.id, item.price)}
            >
              Add to cart
            </button>
          </div>
          <div className="py-12">
            <span className="text-lg">Description</span>
            <div className="py-6 text-gray-400">{item.desc}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
