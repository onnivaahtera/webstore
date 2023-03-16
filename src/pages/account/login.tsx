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

      <main className="text-white">
        <div className="mx-auto w-4/5 rounded-md md:w-96">
          <form
            id="registerFrom"
            method="post"
            action="/api/auth/callback/credentials"
          >
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <div className="">
              <div className="px-4 pt-2">
                <TextInput label="Email" name="email" />
              </div>
              <div className="px-4 pt-2">
                <TextInput label="password" type="password" name="password" />
              </div>
              <div>
                <Button type="submit" className="m-4 h-10 w-32">
                  Login
                </Button>
                <Link href="/account/register" className="hover:underline">
                  Register
                </Link>
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
