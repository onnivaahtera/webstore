import Head from "next/head";
import type { ISignUp } from "../../types/user";
import type { GetServerSidePropsContext } from "next";
import { useState, type FormEvent } from "react";
import { trpc } from "../../utils/trpc";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { TextInput } from "../../components/ui/TextInput";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

const Register = () => {
  const [user, setUser] = useState({} as ISignUp);
  const createUser = trpc.user.register.useMutation();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    console.log(user.password);

    createUser.mutate({
      email: user.email,
      password: user.password,
      fname: user.fname,
      lname: user.lname,
      streetAddress: user.streetAddress,
      city: user.city,
      postalCode: user.postalCode,
      phone: user.phone,
    });
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
        <div className="mx-auto mt-10 w-4/5 rounded-md md:max-w-[550px]">
          <h1 className="text-2xl">Registeration</h1>
          <form id="registerFrom">
            <div className="flex flex-col">
              <div className="mt-5">
                <TextInput
                  label="Email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                />
                <br />
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  value={user.password || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="my-5 grid grid-cols-2 gap-2">
                  <TextInput
                    label="First name"
                    name="fname"
                    value={user.fname || ""}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Last name"
                    name="lname"
                    value={user.lname || ""}
                    onChange={handleChange}
                  />
                </div>
                <TextInput
                  label="Address"
                  name="streetAddress"
                  className="my-5"
                  value={user.streetAddress || ""}
                  onChange={handleChange}
                />
                <div className="my-5 grid grid-cols-2 gap-2">
                  <TextInput
                    label="PostalCode"
                    name="postalCode"
                    value={user.postalCode || ""}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="City"
                    name="city"
                    value={user.city || ""}
                    onChange={handleChange}
                  />
                </div>
                <TextInput
                  label="Phone"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Button
                className="mr-4 mt-6 h-10 w-32"
                type="button"
                onClick={submitForm}
              >
                Register
              </Button>
              <Link href="/account/login" className="hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // get session from getServerAuthSession
  const session = await getServerAuthSession(ctx);

  // if session redirect to profile page
  if (session) {
    return {
      redirect: {
        destination: "/account/info",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
