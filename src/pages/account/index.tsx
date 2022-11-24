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

      <div className="text-3xl text-white">Welcome {session?.user?.name}</div>
      <Image
        className="m-5 rounded-xl border-2 border-black"
        src={`${session?.user?.image}`}
        alt="pfp"
        width={200}
        height={200}
        unoptimized
      />
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
