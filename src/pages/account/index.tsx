import { useSession, signOut } from "next-auth/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { trpc } from "../../utils/trpc";
import { updateUser } from "../../types/user";
import { GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default function Customer() {
  const { data: session } = useSession();
  const id = session?.user.userId;

  const orders = trpc.user.getOrders.useQuery({ id: id as string });
  const user = trpc.user.getUserData.useQuery({ id: id as string });
  const update = trpc.user.updateUserData.useMutation();

  const [data, newData] = useState({} as updateUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    newData((values) => ({ ...values, [name]: value }));
  };

  const updateUserData = (e: FormEvent) => {
    e.preventDefault();
    update.mutate({
      username: `${data.username}`,
      fname: `${data.fname}`,
      lname: `${data.lname}`,
      email: `${data.email}`,
    });
  };

  if (!user.data) return null;

  return (
    <main className="flex flex-row">
      <div className="m-2">
        <span className="text-2xl">Contact info</span>
        <form onSubmit={updateUserData}></form>
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
      <div className="m-2 mx-16">
        <h1 className="text-xl">Orders</h1>
        {orders.data?.length! < 1 && <span>No orders</span>}
      </div>
    </main>
  );
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

  if (session.user.username === "admin") {
    return {
      redirect: {
        destination: "/account/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
