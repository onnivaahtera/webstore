import type { FC } from "react";
import type { orderType } from "../types/product";

interface orderProps extends orderType {
  role?: string;
}

export const Order: FC<orderProps> = ({ role }) => {
  if (role === "admin") return <div>All orders</div>;

  return <div>Orders</div>;
};
