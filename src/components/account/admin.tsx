import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Admin() {
  return (
    <>
      <div>Logged in as Admin user</div>
      <Link href="/product/newProduct">New Product</Link>
      <div>
        <h2 className="text-2xl">Order history</h2>
      </div>
      <br />
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </>
  );
}
