import Head from "next/head";
import { getSession, type GetSessionParams } from "next-auth/react";

const Account = () => {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <div>Welcome</div>
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
