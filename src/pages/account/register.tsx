import { getSession, signIn, type GetSessionParams } from "next-auth/react";
import Head from "next/head";
import { useState, type FormEvent } from "react";
import { trpc } from "../../utils/trpc";
import Router from "next/router";
import type { ISignUp } from "../../types/auth";

function Register() {
  const [user, setUser] = useState({} as ISignUp);

  const createUser = trpc.user.register.useMutation();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser.mutate({
      username: `${user.username}`,
      email: `${user.email}`,
      password: `${user.password}`,
      fname: `${user.fname}`,
      lname: `${user.lname}`,
      role: "customer",
    });
    Router.push("/account/login");
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

      <main className="text-white">
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
                  className="block w-full rounded border-2 border-gray-800 bg-inherit p-2 text-sm hover:border-cyan-500"
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
                  className="block w-full rounded border-2 border-gray-800 bg-inherit p-2 text-sm hover:border-cyan-500"
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
                  className="block w-full rounded border-2 border-gray-800 bg-inherit p-2 text-sm hover:border-cyan-500"
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
                  className="block w-full rounded border-2 border-gray-800 bg-inherit p-2 text-sm hover:border-cyan-500"
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
                  className="block w-full rounded border-2 border-gray-800  bg-inherit p-2 text-sm hover:border-cyan-500"
                  type="lname"
                  name="lname"
                  value={user.lname || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="m-4 h-10 w-40 rounded-lg border-2 border-gray-800 bg-inherit hover:border-cyan-500"
                >
                  Register
                </button>
                <button onClick={() => signIn()}>Login here</button>
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
