import type { FC } from "react";
import type { orderType } from "../../../types/product";
import { AccounNav } from "../../../components/Navbar/AccounNav";
import { trpc } from "../../../utils/trpc";
import { formatCurrency, formatDate } from "../../../utils/formatter";

const Orders: FC = () => {
  const orders = trpc.cart.orders.useQuery();
  return (
    <>
      <AccounNav role="Admin" />
      <main>
        <h1>Orders</h1>
        {orders.data?.map((item) => (
          <Products
            key={item.id}
            id={item.productId}
            date={item.Order?.Date!}
            email={item.Order?.email!}
          />
        ))}
      </main>
    </>
  );
};

export default Orders;

const Products: FC<orderType> = ({ id, date, email }) => {
  const product = trpc.cart.product.useQuery({ id: id });
  return (
    <div className="my-4">
      {product.data?.map((item) => (
        <div key={item.id} className="flex flex-row">
          <img src={item.image} alt="" className="mr-5 h-[50px] w-[100px]" />
          <div className="flex flex-col">
            <span>{item.name}</span>
            <span>Order placed {formatDate(date)}</span>
            <span>By {email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
