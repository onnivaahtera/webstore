import type { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Login: FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div>
        <Link href="/account/register">Register Here</Link>
      </div>
      <div>
        <button onClick={() => signIn("discord")}>Login</button>
      </div>
    </>
  );
};

export default Login;
