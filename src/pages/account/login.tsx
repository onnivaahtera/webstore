import { type FC, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import type { ILogin } from "../../auth/validation/auth";
import { getCsrfToken } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const Login: FC = ({ csrfToken }: any) => {
  const [user, setUser] = useState({} as ILogin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    signIn("credentials", {
      email: user.email,
      password: user.password,
      callbackUrl: "/account",
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main className="text-white">
        <div className="mx-auto mt-24 w-4/5 rounded-md md:w-96">
          <form
            id="registerFrom"
            method="post"
            action="/api/auth/callback/credentials"
          >
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <div className="">
              <div className="px-4 pt-1">
                <label
                  className="block w-fit p-2 hover:cursor-text"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="block w-full rounded border-2 border-gray-800 bg-inherit p-2 text-sm hover:border-cyan-500"
                  type="email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="px-4 pt-1">
                <label
                  className="block w-fit p-2 hover:cursor-text"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="block w-full rounded border-2 border-gray-800 bg-inherit p-2 text-sm hover:border-cyan-500"
                  type="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="m-4 h-10 w-40 rounded-lg border-2 border-gray-800 bg-inherit hover:border-cyan-500"
                >
                  Login
                </button>
                <Link href="/account/register">register</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
