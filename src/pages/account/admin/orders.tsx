import { FC } from "react";
import { AccounNav } from "../../../components/Navbar/AccounNav";
import { Order } from "../../../components/Order";
import { trpc } from "../../../utils/trpc";

interface OrdersProps {}

const Orders: FC<OrdersProps> = ({}) => {
  const data = trpc.cart.allOrders.useQuery();
  console.log(data.data);
  return (
    <>
      <AccounNav role="admin" />
      <main>
        <h1>Orders</h1>
        <div>
          {data.data?.length! > 0
            ? data.data?.map((item) => (
                <Order key={item.id} role="admin" {...item} />
              ))
            : "No orders"}
        </div>
      </main>
    </>
  );
};

export default Orders;
