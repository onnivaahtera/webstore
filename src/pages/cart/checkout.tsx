import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CheckoutItem } from "../../components/CheckoutItem";
import { FormEvent } from "react";
import { formatCurrency } from "../../utils/currencyFormat";
import { trpc } from "../../utils/trpc";

const Checkout = () => {
  const { cartItems, getItemQuantity } = useShoppingCart();

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

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
  };

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
        <div>
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} {...item} />
          ))}
        </div>
        <div className="py-4">
          <span className="text-md font-semibold">
            Order subtotal: {formatCurrency(getTotal())}
          </span>
        </div>
      </div>
      <div className="flex h-12 items-center rounded bg-blue-700">
        <span className="p-5">Shipping & Payment</span>
      </div>
      <div>
        <form onSubmit={submitForm}></form>
      </div>
    </main>
  );
};

export default Checkout;
