import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { FC } from "react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { role } from "../../types/next-auth";

interface ConfirmProps {
  role: role;
}
const Confirm: FC<ConfirmProps> = ({ role }) => {
  return (
    <div className="flex flex-col items-center justify-center text-xl">
      <span>Your order has been confirmed</span>
      <Link href={"/"} className="text-blue-600 hover:text-blue-500">
        Continue shopping
      </Link>
      <Link
        href={role === "Admin" ? "/account/admin/orders" : "/account/orders"}
        className="text-blue-600 hover:text-blue-500"
      >
        View orders
      </Link>
    </div>
  );
};

export default Confirm;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  return {
    props: {
      role: session?.user.role,
    },
  };
};
