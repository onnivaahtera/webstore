import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Admin from "../../components/account/Admin";
import Customer from "./Customer";

export default function Account() {
  const { data: session } = useSession();
  if (session?.user.username === "admin") return <Admin />;

  return <Customer />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // get session from getServerAuthSession
  const session = await getServerAuthSession(ctx);

  // if no session redirect to login page
  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
