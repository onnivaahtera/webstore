import type { FC } from "react";
import Head from "next/head";
import Link from "next/link";

const Login: FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div>
        <Link href="/account/register">Register Here</Link>
      </div>
    </>
  );
};

export default Login;
