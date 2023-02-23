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
        <form onSubmit={updateUserData}>
          <div className="flex flex-col px-4">
            <label htmlFor="username">Username:</label>
            <input
              className="w-64 p-1 text-black"
              type="text"
              name="username"
              id="username"
              disabled
              value={user.data.username}
            />
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col px-4">
              <label htmlFor="fname">First name:</label>
              <input
                className="w-32 p-1 text-black"
                type="text"
                name="fname"
                id="fname"
                placeholder={user.data.fname}
                value={data.fname}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lname">Last name:</label>
              <input
                className="w-32 p-1 text-black"
                type="text"
                name="lname"
                id="lname"
                placeholder={user.data.lname}
                value={data.lname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col px-4">
            <label htmlFor="Email">Email:</label>
            <input
              className="w-64 p-1 text-black"
              type="text"
              name="email"
              id="email"
              placeholder={user.data.email}
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
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
