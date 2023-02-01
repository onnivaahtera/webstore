import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CheckoutItem } from "../../components/CheckoutItem";
import { ChangeEvent, FormEvent, useState } from "react";
import { formatCurrency } from "../../utils/currencyFormat";
import { trpc } from "../../utils/trpc";
import { contactForm } from "../../types/user";

const Checkout = () => {
  const [info, setInfo] = useState({} as contactForm);
  const { cartItems, getItemQuantity } = useShoppingCart();

  const products = trpc.product.allProducts.useQuery();
  const mutation = trpc.cart.confirmOrder.useMutation();

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo((values) => ({ ...values, [name]: value }));
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      data: {},
    });
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
        <div className="rounded border-b border-gray-600 bg-gray-700">
          <span className="px-2 text-gray-300">Products</span>
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
        <form onSubmit={submitForm}>
          <div className="my-3 flex flex-col">
            <label htmlFor="fname">*First name</label>
            <input
              type="text"
              name="fname"
              value={info.fname || ""}
              onChange={handleChange}
              className="rounded border border-gray-700 bg-inherit p-2"
            />
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="lname">*Last name</label>
            <input
              type="text"
              name="lname"
              value={info.lname || ""}
              onChange={handleChange}
              className="rounded border border-gray-700 bg-inherit p-2"
            />
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="street">*Street address</label>
            <input
              type="text"
              name="street"
              value={info.street || ""}
              onChange={handleChange}
              className="rounded border border-gray-700 bg-inherit p-2"
            />
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="city">*City</label>
            <input
              type="text"
              name="city"
              value={info.city || ""}
              onChange={handleChange}
              className="rounded border border-gray-700 bg-inherit p-2"
            />
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="postcode">*Postcode</label>
            <input
              type="text"
              name="postcode"
              value={info.postcode || ""}
              onChange={handleChange}
              className="rounded border border-gray-700 bg-inherit p-2"
            />
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="email">*Email</label>
            <input
              type="text"
              name="email"
              value={info.email || ""}
              onChange={handleChange}
              className="rounded border border-gray-700 bg-inherit p-2"
            />
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="phone">*Phone</label>
            <input
              type="text"
              name="phone"
              value={info.phone || ""}
              onChange={handleChange}
              className="rounded border border-gray-700 bg-inherit p-2"
            />
          </div>
          <button
            onClick={submitForm}
            className="h-10 w-full rounded bg-blue-700"
          >
            Confirm order
          </button>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
