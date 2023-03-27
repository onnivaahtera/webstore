import { type FC } from "react";
import { CartItem } from "../../components/CartItem";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { FaTrashAlt } from "react-icons/fa";
import { trpc } from "../../utils/trpc";
import { formatCurrency } from "../../utils/formatter";
import { Button } from "../../components/ui/Button";
import Head from "next/head";
import { useRouter } from "next/router";

const Cart: FC = () => {
  const { cartItems, clearCart, getItemQuantity } = useShoppingCart();
  const router = useRouter();
  const products = trpc.product.allProducts.useQuery();
  const item = products.data;
  if (!item) return null;

  const getTotal = () => {
    const sum = item
      .map((a) => a.price * getItemQuantity(a.id))
      .reduce((a, b) => {
        return a + b;
      });

    return sum;
  };

  const getTax = () => {
    return (24 * getTotal()) / (100 + 24);
  };

  if (cartItems.length === 0)
    return <div className="my-12 text-center text-3xl">Cart is empty</div>;

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <main>
        <h1>Cart</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:mr-10 md:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id}>
                <CartItem key={item.id} {...item} />
              </div>
            ))}
          </div>
          <div className="md:w-1/3 ">
            <div className="mb-3 flex flex-col border-b border-gray-600 pb-3">
              <span>
                Total (VAT 0%): {formatCurrency(getTotal() - getTax())}
              </span>
              <span>VAT (24%): {formatCurrency(getTax())}</span>
            </div>
            <div>
              <span>Total: {formatCurrency(getTotal())}</span>
            </div>
            <Button
              type="button"
              className="mt-5 h-10 w-full"
              onClick={() => router.push("/cart/checkout")}
            >
              Continue to checkout {"->"}{" "}
            </Button>
            <button
              className="mt-5 flex items-center hover:text-blue-500"
              onClick={() => clearCart()}
            >
              <FaTrashAlt className="mr-2 text-2xl" /> <span>Empty cart</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
