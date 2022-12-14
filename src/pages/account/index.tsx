import Head from "next/head";
import { getSession, signOut, useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import Custom404 from "../404";
import Link from "next/link";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const Account = ({ session }: any) => {
  if (!session) return <Custom404 />;

  const data = trpc.user.getUserData.useQuery({ id: session.user.userId });
  if (!data.data) return <Custom404 />;

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <main>
        <h1 className="p-2 text-center text-2xl">Welcome</h1>
        <div className="text-center text-xl">Email: {data.data.email}</div>
        <div className="text-center text-xl">
          Username: {data.data.username}
        </div>
        <div className="text-center text-xl">Role: {data.data.role}</div>
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

  return <div></div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
