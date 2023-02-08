import {
  getSession,
  GetSessionParams,
  useSession,
  signOut,
} from "next-auth/react";
import { useState, ChangeEvent, FormEvent } from "react";
import Admin from "../../components/account/admin";
import Customer from "../../components/account/customer";
import { updateForm } from "../../types/user";
import { trpc } from "../../utils/trpc";

export default function Account() {
  const { data: session } = useSession();

  if (session?.user.role === "admin") return <Admin />;

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

/*
 */
