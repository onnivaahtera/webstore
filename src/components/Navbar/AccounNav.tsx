import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

function AccounNav() {
  return (
    <div className="my-2 flex flex-row justify-between border-b border-gray-600 text-lg">
      <div className="px-4">
        <Link href="/account/info" className="pr-4">
          Account
        </Link>
        <Link href="/account/orders" className="">
          Orders
        </Link>
      </div>
      <div>
        <button onClick={() => signOut()}>
          <span className="flex flex-row items-center justify-center">
            <MdLogout /> Sign out
          </span>
        </button>
      </div>
    </div>
  );
}

export default AccounNav;
