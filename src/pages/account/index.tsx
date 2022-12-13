import Head from "next/head";
import {
  getSession,
  signOut,
  useSession,
  type GetSessionParams,
} from "next-auth/react";
import { trpc } from "../../utils/trpc";
import Custom404 from "../404";

const Account = () => {
  const { data: session } = useSession();

  if (!session) return <Custom404 />;

  const data = trpc.user.getUserData.useQuery({ id: session.user.userId });

  if (!data.data) return <Custom404 />;

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <main>
        <h1 className="p-2 text-center text-2xl">Welcome</h1>
        <div className="text-center text-xl">Email: {data.data.email}</div>
        <div className="text-center text-xl">
          Username: {data.data.username}
        </div>
        <div className="text-center text-xl">Role: {data.data.role}</div>
        <div className="m-6 flex items-center justify-center text-lg">
          <button className="" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </main>
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
