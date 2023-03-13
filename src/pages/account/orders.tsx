import { useSession } from "next-auth/react";
import React from "react";
import { AccounNav } from "../../components/Navbar/AccounNav";
import { Order } from "../../components/Order";
import { trpc } from "../../utils/trpc";

const Orders = () => {
  const { data: session } = useSession();
  const data = trpc.cart.userOrders.useQuery({ id: session?.user.userId! });
  return (
    <>
      <AccounNav role="customer" />
      <main>
        <h1>Orders</h1>
        <div>
          {data.data?.length! > 0
            ? data.data?.map((item) => <Order key={item.id} {...item} />)
            : "No orders"}
        </div>
      </main>
    </>
  );
};

export default Orders;
