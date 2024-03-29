import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useState } from "react";
import { CheckoutItem } from "../../components/CheckoutItem";
import { Button } from "../../components/ui/Button";
import { TextInput } from "../../components/ui/TextInput";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import type { order } from "../../types/shoppingCart";
import { formatCurrency } from "../../utils/formatter";
import { trpc } from "../../utils/trpc";

const Checkout: FC = () => {
  const [info, setInfo] = useState({} as order);
  const { cartItems, getItemQuantity, clearCart } = useShoppingCart();
  const { data: session } = useSession();
  const router = useRouter();
  const user = trpc.user.getUserData.useQuery({
    id: session?.user.userId as string,
  });
  const products = trpc.product.allProducts.useQuery();
  const order = trpc.cart.completeOrder.useMutation();
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo((values) => ({ ...values, [name]: value }));
  };

  const confirmOrder = (e: FormEvent) => {
    e.preventDefault();
    order.mutate({
      cardNumber: info.cardNumber,
      cvc: info.cvc,
      expirationDate: info.expirationDate,
      city: info.city,
      email: info.email,
      fname: info.fname,
      lname: info.lname,
      phone: info.phone,
      postalCode: info.postalCode,
      streetAddress: info.streetAddress,
      date: new Date(),
      cartItems: cartItems,
    });
    clearCart();
    router.push("/cart/confirm");
  };

  if (!user.data)
    return (
      <div>
        <h1 className="text-center text-xl">Login or create account</h1>
        <div className="flex flex-col items-center">
          <Link href={"/account/login"} className="hover:text-blue-600">
            Login
          </Link>
          <Link href={"/account/reqgister"} className="hover:text-blue-600">
            Create account
          </Link>
        </div>
      </div>
    );

  return (
    <main className="m-2 my-5 md:m-16">
      <h1 className="text-center text-2xl md:text-left">Shipping & Payment</h1>
      <div className="flex flex-col lg:flex-row lg:gap-5">
        {/* Order details */}
        <div className="my-5">
          <h2 className="border-b-2 border-blue-600 py-2 text-2xl">
            Order details
          </h2>
          <div className="my-2 rounded-lg bg-background2 p-5">
            {cartItems.map((value) => (
              <CheckoutItem key={value.id} {...value} />
            ))}
            <span>Order Total: {formatCurrency(getTotal())}</span>
          </div>
          <div className="hidden lg:block">
            <h2 className="border-b-2 border-blue-600 py-2 text-2xl">
              Payment
            </h2>
            <form>
              <div className="my-3 bg-background2 p-5">
                <TextInput
                  label="Card number"
                  name="cardNumber"
                  value={info.cardNumber || ""}
                  onChange={handleChange}
                />
                <div className="my-5 mb-3 grid grid-cols-2 gap-5">
                  <TextInput
                    label="cvc"
                    name="cvc"
                    value={info.cvc || ""}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="expiration date"
                    name="expirationDate"
                    value={info.expirationDate || ""}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  type="button"
                  className="mt-5 h-fit w-[150px] p-4"
                  onClick={confirmOrder}
                >
                  Confirm order
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Shipping */}
        <div className="mt-5">
          <h2 className="border-b-2 border-blue-600 py-2 text-2xl">Shipping</h2>
          <form>
            <div className="my-2 rounded-lg bg-background2 p-5">
              <div className="mb-3 grid grid-cols-2 gap-5">
                <div className="w-full">
                  <TextInput
                    label="First name"
                    name="fname"
                    defaultValue={user.data.fname}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="Last name"
                    name="lname"
                    defaultValue={user.data.lname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <TextInput
                label="Address"
                name="address"
                defaultValue={user.data.streetAddress}
                onChange={handleChange}
                className="my-5"
              />
              <div className="mb-3 grid grid-cols-2 gap-5">
                <div className="w-full">
                  <TextInput
                    label="Postal code"
                    name="postalcode"
                    defaultValue={user.data.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="City"
                    name="city"
                    defaultValue={user.data.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="my-5">
                <TextInput
                  label="Email"
                  name="email"
                  defaultValue={user.data.email}
                  onChange={handleChange}
                />
              </div>
              <TextInput
                label="Phone number"
                name="phone"
                defaultValue={user.data.phone}
                onChange={handleChange}
              />
            </div>
          </form>
          <div className="lg:hidden">
            <h2 className="border-b-2 border-blue-600 py-2 text-2xl">
              Payment
            </h2>
            <form>
              <div className="my-3 bg-background2 p-5">
                <TextInput
                  label="Card number"
                  name="cardNumber"
                  value={info.cardNumber || ""}
                  onChange={handleChange}
                />
                <div className="my-5 mb-3 grid grid-cols-2 gap-5">
                  <TextInput
                    label="cvc"
                    name="cvc"
                    value={info.cvc || ""}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="expiration date"
                    name="expirationDate"
                    value={info.expirationDate || ""}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  type="button"
                  className="mt-5 h-fit w-[150px] p-4"
                  onClick={confirmOrder}
                >
                  Confirm order
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
