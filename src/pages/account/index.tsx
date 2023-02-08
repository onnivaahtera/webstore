import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";
import Admin from "../../components/account/admin";
import Customer from "../../components/account/customer";

export default function Account() {
  const { data: session } = useSession();

  if (session?.user.role === "admin") return <Admin />;

  return <Customer />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get session from getServerAuthSession
  const session = await getSession(context);

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

/*
 */
