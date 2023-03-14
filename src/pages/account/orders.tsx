import React, { type FC } from "react";
import { useSession } from "next-auth/react";
import { AccounNav } from "../../components/Navbar/AccounNav";
import { trpc } from "../../utils/trpc";
import { orderType } from "../../types/product";
import { formatDate } from "../../utils/format";

const Orders = () => {
  const { data: session } = useSession();
  const data = trpc.cart.userOrders.useQuery({ id: session?.user.userId! });
  return (
    <>
      <AccounNav role="customer" />
      <main>
        <h1 className="text-xl">Orders</h1>
        <div>
          {data.data?.length! > 0
            ? data.data?.map((item) => <Order key={item.id} {...item} />)
            : "No orders"}
        </div>
      </main>
    </>
  );
};

const Order: FC<orderType> = ({ id, Date }) => {
  const products = trpc.cart.orderedProduct.useQuery({ id: id });

  return (
    <main>
      <div className="m-2 flex border border-gray-600 p-2">
        <img src={products.data?.image} width="75px" alt="" loading="lazy" />
        <div className="px-2">
          <div>{products.data?.name}</div>
          <div>Ordered on {formatDate(Date)}</div>
        </div>
      </div>
    </main>
  );
};

export default Orders;
