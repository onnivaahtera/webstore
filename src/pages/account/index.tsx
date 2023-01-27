import { getSession, GetSessionParams } from "next-auth/react";
import { signOut } from "next-auth/react";
import Customer from "../../components/account/Customer";

export default function Account() {
  return <button onClick={() => signOut()}>Sign out</button>;
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
