import { getSession, type GetSessionParams } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { hashPassword } from "../../lib/auth";
import { trpc } from "../../utils/trpc";

type user = {
  username: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
};

const createUser = trpc.user.register.useMutation();

function Register() {
  const [user, setUser] = useState({} as user);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    hashPassword(user.password);

    createUser.mutate({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <main className="">
        <div className="mx-auto mt-24 w-4/5 rounded-md md:w-96">
          <form id="registerFrom" onSubmit={submitForm}>
            <div className="">
              <div className="px-4 pt-1">
                <label
                  className="block w-fit p-2 hover:cursor-text"
                  htmlFor="userName"
                >
                  Username:
                </label>
                <input
                  className="block w-full rounded border-2 border-gray-300 p-2 text-sm hover:border-gray-500"
                  type="text"
                  name="username"
                  value={user.username || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="px-4 pt-1">
                <label
                  className="block w-fit p-2 hover:cursor-text"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="block w-full rounded border-2 border-gray-300 p-2 text-sm hover:border-gray-500"
                  type="email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="px-4 pt-1">
                <label
                  className="block w-fit p-2 hover:cursor-text"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="block w-full rounded border-2 border-gray-300 p-2 text-sm hover:border-gray-500"
                  type="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="px-4 pt-1">
                <label
                  className="block w-fit p-2 hover:cursor-text"
                  htmlFor="fname"
                >
                  First name:
                </label>
                <input
                  className="block w-full rounded border-2 border-gray-300 p-2 text-sm hover:border-gray-500"
                  type="fname"
                  name="fname"
                  value={user.fname || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="px-4 pt-1">
                <label
                  className="block w-fit p-2 hover:cursor-text"
                  htmlFor="fname"
                >
                  Last name:
                </label>
                <input
                  className="block w-full rounded border-2 border-gray-300 p-2 text-sm hover:border-gray-500"
                  type="lname"
                  name="lname"
                  value={user.lname || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="m-4 h-10 w-40 rounded-lg border-2 border-gray-300 hover:border-gray-500"
                >
                  Register
                </button>
                <Link href="/account/login">Login</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
