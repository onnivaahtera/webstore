import type { FC, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import type { GetSessionParams } from "next-auth/react";

const Login: FC = () => {
  const login = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div>
        <Link href="/account/register">Register Here</Link>
      </div>
      <div>
        <button onClick={login}>Login</button>
      </div>
    </>
  );
};

export default Login;

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
