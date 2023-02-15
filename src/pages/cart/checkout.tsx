import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CheckoutItem } from "../../components/CheckoutItem";
import { ChangeEvent, FormEvent, useState } from "react";
import { formatCurrency } from "../../utils/currencyFormat";
import { trpc } from "../../utils/trpc";
import { orderType } from "../../types/shoppingCart";

const Checkout = () => {
  const [info, setInfo] = useState({} as orderType);
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
      fname: info.fname,
      lname: info.lname,
      city: info.city,
      email: info.email,
      phone: info.phone,
      streetAddress: info.streetAddress,
      streetNumber: info.streetNumber,
      postalcode: info.postalcode,
      cardNumber: info.cardNumber,
      cvc: info.cvc,
      expirationDate: info.expirationDate,
    });
  };

  return (
    <main className="m-2 md:m-20">
      <div>
        <h1 className="text-2xl">Checkout</h1>
        <span className="text-gray-400">
          Please fill out your shipping information
        </span>
      </div>

      <div className="flex-row md:flex">
        <div className="my-5 lg:my-8 lg:w-[550px]">
          <h2>Your order</h2>
          <div className="flex h-[40px] items-center rounded bg-gray-700 p-3">
            <span className="text-lg text-gray-200">Products</span>
          </div>
          <div>
            {cartItems.map((item) => (
              <CheckoutItem key={item.id} {...item} />
            ))}
          </div>
          <div className="flex justify-between p-2">
            <span>Order subtotal: </span>
            <span className="px-2">{formatCurrency(getTotal())}</span>
          </div>
          <button
            onClick={submitForm}
            className="my-4 h-10 w-32 rounded bg-blue-700"
          >
            Confirm order
          </button>
        </div>

        <div className="md:mx-10 md:w-[350px] lg:mx-32">
          <form onSubmit={submitForm}>
            <div>
              <h2 className="text-xl">Shipping</h2>
            </div>
            <div className="flex-row md:flex">
              <div className="my-2 flex flex-col">
                <label className="my-2" htmlFor="fname">
                  *First name
                </label>
                <input
                  className="rounded p-1 text-black"
                  type="text"
                  name="fname"
                  value={info.fname || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="my-2 flex flex-col md:px-4">
                <label className="my-2" htmlFor="lname">
                  *Last name
                </label>
                <input
                  className="rounded p-1 text-black"
                  type="text"
                  name="lname"
                  value={info.lname || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex-row md:flex">
              <div className="my-2 flex flex-col">
                <label className="my-2" htmlFor="street">
                  *Street address
                </label>
                <input
                  className="rounded p-1 text-black"
                  type="text"
                  name="streetAddress"
                  value={info.streetAddress || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="my-2 flex flex-col md:px-4">
                <label className="my-2" htmlFor="streetNumber">
                  *Street number
                </label>
                <input
                  className="rounded p-1 text-black"
                  type="text"
                  name="streetNumber"
                  value={info.streetNumber || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex-row md:flex">
              <div className="my-2 flex flex-col">
                <label className="my-2" htmlFor="city">
                  *City
                </label>
                <input
                  className="rounded p-1 text-black"
                  type="text"
                  name="city"
                  value={info.city || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="my-2 flex flex-col md:px-4">
                <label className="my-2" htmlFor="postalcode">
                  *Postalcode
                </label>
                <input
                  className="rounded p-1 text-black"
                  type="text"
                  name="postalcode"
                  value={info.postalcode || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex-row md:flex">
              <div className="my-2 flex flex-col">
                <label className="my-2" htmlFor="email">
                  *Email
                </label>
                <input
                  className="rounded p-1 text-black"
                  type="text"
                  name="email"
                  value={info.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="my-2 flex flex-col md:px-4">
                <label className="my-2" htmlFor="phone">
                  *Phone
                </label>
                <input
                  className="rounded p-1 text-black"
                  type="text"
                  name="phone"
                  value={info.phone || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />
            <div>
              <h2 className="text-xl">Payment</h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="card">Card number: </label>
              <input
                className="text-black"
                type="text"
                name="cardNumber"
                value={info.cardNumber || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row">
              <div className="">
                <label htmlFor="">CVC:</label>
                <input
                  className="text-black"
                  type="text"
                  name="cvc"
                  value={info.cvc || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label htmlFor="expirationDate">Expiration date:</label>
                <input
                  className="text-black"
                  type="text"
                  name="expirationDate"
                  value={info.expirationDate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
