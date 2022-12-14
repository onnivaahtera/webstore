import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Admin: React.FC = () => {
  const { data: session } = useSession();

  if (session?.user.role === "admin")
    return <Link href="/product/newProduct">New Product</Link>;

  return <div></div>;
};

export default Admin;
