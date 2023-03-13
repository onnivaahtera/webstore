import { FC } from "react";

interface orderProps {
  role?: string;
}

export const Order: FC<orderProps> = ({ role }) => {
  if (role === "admin") return <div>All orders</div>;

  return <div>Orders</div>;
};
