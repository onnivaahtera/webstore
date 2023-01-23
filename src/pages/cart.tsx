import { FC } from "react";
import { CartItem } from "../components/CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { FaTrashAlt } from "react-icons/fa";
import { trpc } from "../utils/trpc";
import { formatCurrency } from "../utils/currencyFormat";

interface CartProps {}

const Cart: FC<CartProps> = ({}) => {
  const { cartItems, clearCart, getItemQuantity } = useShoppingCart();
  const products = trpc.product.allProducts.useQuery();

  if (!products.data) return null;

  const getTotal = () => {
    const item = products.data;
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
    <div>
      <h1 className="text-center text-2xl">Cart</h1>

      <div className="border-4 border-red-500">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="flex flex-row justify-between">
        <button onClick={() => clearCart(cartItems)}>
          <FaTrashAlt className="text-3xl" />
        </button>

        <div className="flex flex-col">
          <span className="">Total (ALV 0%): {}</span>
          <span className="">ALV (24%): {formatCurrency(getTax())}</span>
          <span className="text-bold">Total: {formatCurrency(getTotal())}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
