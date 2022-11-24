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

      <div>Welcome {session?.user?.name}</div>
      <Image
        src={`${session?.user?.image}`}
        alt="pfp"
        width={200}
        height={200}
        unoptimized
      />
      <div>{status}</div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
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
