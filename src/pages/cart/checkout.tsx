import { useShoppingCart } from "../../context/ShoppingCartContext";
import { trpc } from "../../utils/trpc";

const Checkout = () => {
  const { cartItems, getItemQuantity } = useShoppingCart();
  const products = trpc.product.allProducts.useQuery();
  const item = products.data;
  if (!item) return null;

  return (
    <main>
      <div className="py-5 pb-[50px]">
        <h1 className="text-2xl">Checkout</h1>
        <span className="text-sm text-gray-400">
          Please fill out your shipping information
        </span>
      </div>
      <div>
        <h2 className="text-lg">Your order</h2>
        <div className="border-b border-gray-600 bg-gray-700">
          <span className="text-gray-300">Products</span>
        </div>
        <div>{}</div>
      </div>
    </main>
  );
};

export default Checkout;
