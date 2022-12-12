import Head from "next/head";
import Image from "next/image";

import {
  getSession,
  signOut,
  useSession,
  type GetSessionParams,
} from "next-auth/react";

const Account = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <div className="text-xl text-white">
        Welcome
        <div className="text-xl">Session expires {session?.expires}</div>
        <div>id {session?.user.userId}</div>
        <div>email {session?.user.email}</div>
        <div>username {session?.user.username}</div>
      </div>
      <div>{status}</div>
      <button
        className="h-40 w-40 rounded-lg bg-slate-900 text-3xl text-white"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </button>
    </>
  );
};

export default Account;

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

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
