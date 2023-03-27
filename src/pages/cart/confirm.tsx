import Link from "next/link";
import React from "react";

function Confirm() {
  return (
    <div className="flex flex-col items-center justify-center text-xl">
      <span>Your order has been confirmed</span>
      <Link href={"/"} className="text-blue-600 hover:text-blue-500">
        Continue shopping
      </Link>
      <Link
        href={"/account/orders"}
        className="text-blue-600 hover:text-blue-500"
      >
        View orders
      </Link>
    </div>
  );
}

export default Confirm;
