import { type FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { TextInput } from "../../components/ui/TextInput";

const Login: FC = ({ csrfToken }: any) => {
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
                <TextInput label="Username" name="username" />
              </div>
              <div className="px-4 pt-1">
                <TextInput label="password" type="password" name="password" />
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // get session from getServerAuthSession
  const session = await getServerAuthSession(ctx);

  if (session?.user.role === "admin") {
    return {
      redirect: {
        destination: "/account/admin",
        permanent: false,
      },
    };
  }

  // if session redirect to profile page
  if (session) {
    return {
      redirect: {
        destination: "/account/info",
        permanent: false,
      },
    };
  }

  // return csrf token
  return {
    props: {
      csrfToken: await getCsrfToken(ctx),
    },
  };
}
