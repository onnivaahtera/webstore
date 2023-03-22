import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { type FC } from "react";
import { MdLogout } from "react-icons/md";

interface AccountNavProps {
  role: "Customer" | "Admin";
}

export const AccounNav: FC<AccountNavProps> = ({ role }) => {
  return (
    <div className="my-2 flex flex-row justify-between border-b border-gray-600 text-lg">
      <div className="">
        <Link
          href={role === "Admin" ? "/account/admin/" : "/account/info"}
          className="pr-4"
        >
          Account
        </Link>
        <Link
          href={role === "Admin" ? "/account/admin/orders" : "/account/orders"}
        >
          Orders
        </Link>
      </div>
      <div>
        <button onClick={() => signOut({ callbackUrl: "/" })}>
          <span className="flex flex-row items-center justify-center">
            <MdLogout /> Sign out
          </span>
        </button>
      </div>
    </div>
  );
};
