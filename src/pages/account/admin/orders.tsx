import type { FC } from "react";
import type { orderType } from "../../../types/product";
import { AccounNav } from "../../../components/Navbar/AccounNav";
import { trpc } from "../../../utils/trpc";
import { formatCurrency, formatDate } from "../../../utils/formatter";

const Orders: FC = () => {
  const orders = trpc.cart.orders.useQuery();
  if (!orders.data) return <div>No orders</div>;
  return (
    <>
      <AccounNav role="Admin" />
      <main>
        <h1>Orders</h1>
        {orders.data.map((item) => (
          <Products
            key={item.id}
            id={item.productId}
            date={item.Order!.Date}
            email={item.Order!.email}
            quantity={item.quantity}
          />
        ))}
      </main>
    </>
  );
};

export default Orders;

const Products: FC<orderType> = ({ id, date, email, quantity }) => {
  const product = trpc.cart.product.useQuery({ id: id });
  if (!product.data) return <div>No orders</div>;
  return (
    <div className="my-4 border border-gray-600 bg-background2 p-4">
      {product.data.map((item) => (
        <div key={item.id} className="flex flex-row">
          <img
            src={item.image}
            alt=""
            className="mr-5 aspect-square h-[75px]"
          />
          <div className="flex flex-col">
            <span>{item.name}</span>
            <span>Order placed {formatDate(date)}</span>
            <div className="flex flex-row gap-3">
              <span>Total: {formatCurrency(item.price * quantity)}</span>
              <span>Quantity: {quantity}</span>
            </div>
            <span>By {email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
