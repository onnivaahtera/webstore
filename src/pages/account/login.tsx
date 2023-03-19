import { type FC } from "react";
import Link from "next/link";
import Head from "next/head";
import { getCsrfToken } from "next-auth/react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { TextInput } from "../../components/ui/TextInput";
import { Button } from "../../components/ui/Button";
import { GetServerSidePropsContext } from "next";

const Login: FC = ({ csrfToken }: any) => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main>
        <div className="mx-auto mt-10 w-4/5 rounded-md md:max-w-[550px]">
          <h1 className="text-2xl">Login</h1>
          <form
            id="registerFrom"
            method="post"
            action="/api/auth/callback/credentials"
          >
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <div className="flex flex-col">
              <div className="mt-5">
                <TextInput label="email" name="email" className="mb-3" />
                <TextInput label="password" name="password" type="password" />
              </div>
              <div className="mt-4 px-2">
                <Button type="submit" className="mr-4 h-10 w-32">
                  Login
                </Button>
                <Link href="/account/register">Register</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // get session from getServerAuthSession
  const session = await getServerAuthSession(ctx);
  const token = await getCsrfToken(ctx);

  if (session?.user.role === "Admin") {
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
      csrfToken: token,
    },
  };
};
