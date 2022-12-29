import Head from "next/head";
import {
  getSession,
  GetSessionParams,
  signOut,
  useSession,
} from "next-auth/react";
import { trpc } from "../../utils/trpc";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { IUpdate } from "../../types/auth";

export default function Account() {
  const { data: session } = useSession();

  if (!session) return null;

  if (session.user.role === "customer") return <Customer />;

  if (session.user.role === "admin") return <Admin />;
}

export const Admin = () => {
  return (
    <>
      <div>Logged in as Admin user</div>
      <Link href="/product/newProduct">New Product</Link>
      <div>
        <h2 className="text-2xl">Order history</h2>
      </div>
      <br />
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </>
  );
};

const Customer = () => {
  const { data: session } = useSession();
  const [data, newData] = useState({} as IUpdate);

  if (!session) return null;

  const user = trpc.user.getUserData.useQuery({ id: session.user.userId });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    newData((values) => ({ ...values, [name]: value }));
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    console.log(data);
  };

  if (!user.data) return null;
  return (
    <main>
      <div className="m-2">
        <span className="text-2xl">Contact info</span>
        <form onSubmit={handleSave}>
          <div className="flex flex-col px-4">
            <label htmlFor="username">Username:</label>
            <input
              className="w-64 p-1 text-black"
              type="text"
              name="username"
              id="username"
              value={user.data.username}
              onChange={handleChange}
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
                value={data.fname || ""}
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
                value={data.lname || ""}
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
              value={data.email || ""}
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
    </main>
  );
};

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
    props: { session },
  };
}
