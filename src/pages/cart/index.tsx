import { CartItem } from "../../components/CartItem";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { FaTrashAlt } from "react-icons/fa";
import { trpc } from "../../utils/trpc";
import { formatCurrency } from "../../utils/formatter";
import { FC } from "react";
import Link from "next/link";

interface CartProps {}

const Cart: FC<CartProps> = ({}) => {
  const { cartItems, clearCart, getItemQuantity } = useShoppingCart();
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
    <div className="m-2">
      <h1 className="m-4 text-center text-2xl">Cart</h1>

      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="my-4 flex flex-row justify-between">
        <div className="flex flex-col">
          <span>
            Total price (VAT 0%): {formatCurrency(getTotal() - getTax())}
          </span>
          <span>VAT (24%): {formatCurrency(getTax())}</span>
          <span className="font-bold">Total: {formatCurrency(getTotal())}</span>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => clearCart(cartItems)}>
            <FaTrashAlt className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex h-12 items-center justify-center rounded bg-blue-700 md:w-[300px]">
        <Link href={"/cart/checkout"} className="w-full text-center text-xl">
          Continue to checkout {">"}{" "}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
