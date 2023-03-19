import React, { type FC } from "react";
import type { orderType } from "../../types/product";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { formatCurrency, formatDate } from "../../utils/formatter";
import { AccounNav } from "../../components/Navbar/AccounNav";
import Image from "next/image";

const Orders = () => {
  const { data: session } = useSession();
  const data = trpc.cart.userOrders.useQuery({
    id: session?.user.userId as string,
  });
  return (
    <>
      <AccounNav role="Customer" />
      <main>
        <h1 className="text-xl">Orders</h1>
        <div>
          {(data.data?.length as number) > 0
            ? data.data?.map((item) => <Order key={item.id} {...item} />)
            : "No orders"}
        </div>
      </main>
    </>
  );
};

const Order: FC<orderType> = ({ id, Date, totalPrice }) => {
  const products = trpc.cart.orderedProduct.useQuery({ id: id });

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
        </div>
        <div>Price: {formatCurrency(totalPrice)}</div>
      </div>
    </main>
  );
};

export default Orders;
