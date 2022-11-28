import { getSession, GetSessionParams } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import Link from "next/link";
import { useState, type FormEvent } from "react";

type user = {
  email: string;
  password: string;
  fname: string;
  lname: string;
};

function Register() {
  const [user, setUser] = useState({} as user);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="block w-full rounded p-2 text-sm"
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
                  className="block w-full rounded p-2 text-sm"
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
                  className="block w-full rounded p-2 text-sm"
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
                  className="block w-full rounded p-2 text-sm"
                  type="lname"
                  name="lname"
                  value={user.lname || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button type="submit" className="m-4 h-10 w-40 rounded-lg">
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
