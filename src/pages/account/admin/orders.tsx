import { FC } from "react";
import { AccounNav } from "../../../components/Navbar/AccounNav";

interface OrdersProps {}

const Orders: FC<OrdersProps> = ({}) => {
  return (
    <>
      <AccounNav role="admin" />
      <div>orders</div>{" "}
    </>
  );
};

export default Orders;
