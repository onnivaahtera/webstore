import Head from "next/head";
import { useRouter } from "next/router";
import type { FC } from "react";
import { Button } from "../../components/ui/Button";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatter";
import { trpc } from "../../utils/trpc";
import Custom404 from "../404";

const Product: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { increaseCartQuantity } = useShoppingCart();

  const product = trpc.product.getProduct.useQuery({ url: `${id}` });

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
        <div className="flex flex-col sm:flex-row">
          <div className="mr-10">
            <img
              src={item.image}
              alt=""
              className="min-w-[300px] pb-5 lg:max-w-[500px]"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span className="text-xl">{item.name}</span>
              <span className="mt-4 text-lg font-bold">
                {formatCurrency(item.price)}
              </span>
              <span className="text-sm text-gray-400">
                Price includes vat. 24%
              </span>
              <div>
                <Button
                  type="button"
                  className="mt-4 h-[50px] w-[100px]"
                  onClick={() => increaseCartQuantity(item.id, item.price)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
            <div className="hidden py-12 lg:block">
              <span className="text-lg">Description</span>
              <div className=" py-6 text-gray-400">{item.desc}</div>
            </div>
          </div>
        </div>
        <div className="py-12 lg:hidden">
          <span className="text-lg">Description</span>
          <div className=" py-6 text-gray-400">{item.desc}</div>
        </div>
      </main>
    </>
  );
};

export default Product;
