import type { FC } from "react";
import type { orderType } from "../../../types/product";
import { AccounNav } from "../../../components/Navbar/AccounNav";
import { trpc } from "../../../utils/trpc";
import { formatCurrency, formatDate } from "../../../utils/formatter";
import Image from "next/dist/client/image";

const Orders: FC = () => {
  const data = trpc.cart.allOrders.useQuery();
  return (
    <>
      <AccounNav role="Admin" />
      <main>
        <h1>Orders</h1>
        <div>
          {(data.data?.length as number) > 0
            ? data.data?.map((item) => <Order key={item.id} {...item} />)
            : "No orders"}
        </div>
      </main>
    </>
  );
};

export default Orders;

const Order: FC<orderType> = ({ Date, email, totalPrice }) => {
  const products = trpc.cart.allOrderedProducts.useQuery();

  return (
    <main>
      <div className="m-2 flex border border-gray-600 p-2">
        <Image
          src={`${products.data?.image}`}
          width={100}
          height={75}
          alt="product img"
          unoptimized
        />
        <div className="px-2">
          <div>{products.data?.name}</div>
          <div>Ordered on {formatDate(Date)}</div>
          <div>By: {email}</div>
        </div>
        <div>Price: {formatCurrency(totalPrice)}</div>
      </div>
    </main>
  );
};
