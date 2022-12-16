import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

const Account = () => {
  const { data: session } = useSession();

  const user = trpc.user.getUserData.useQuery({
    id: session?.user.userId,
  });

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <main>
        <h1 className="p-2 text-center text-2xl">Welcome</h1>
        <div className="text-center text-xl">Email: {user.data?.email}</div>
        <div className="text-center text-xl">
          Username: {user.data?.username}
        </div>
        <div className="text-center text-xl">Role: {user.data?.role}</div>
        <Admin />
        <div className="m-6 flex items-center justify-center text-lg">
          <button className="" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </main>
    </>
  );
};

export default Account;

const Admin = () => {
  const { data: session } = useSession();

  if (session?.user.role === "admin")
    return <Link href="/product/newProduct">New Product</Link>;

  return null;
};
