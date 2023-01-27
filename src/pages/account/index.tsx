import { getSession, GetSessionParams, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Admin from "../../components/account/Admin";
import Customer from "../../components/account/Customer";

export default function Account() {
  const { data: session } = useSession();
  if (session?.user.username === "admin") return <Admin />;

  return <Customer />;
}

export async function getServerSideProps(context: GetSessionParams) {
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
