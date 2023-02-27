import { useSession, signOut } from "next-auth/react";
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { trpc } from "../../utils/trpc";
import { updateUser } from "../../types/user";
import { GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { TextInput } from "../../components/ui/TextInput";
import { Button } from "../../components/ui/Button";
import AccounNav from "../../components/Navbar/AccounNav";

export default function Customer() {
  const { data: session } = useSession();
  const id = session?.user.userId;

  const user = trpc.user.getUserData.useQuery({ id: id! });
  const update = trpc.user.updateUserData.useMutation();

  const [data, setData] = useState({} as updateUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const updateUserData = (e: any) => {
    e.preventDefault();
    console.log(data);

    /*     update.mutate({
      username: `${data.username}`,
      fname: `${data.fname}`,
      lname: `${data.lname}`,
      email: `${data.email}`,
    }); */
  };

  const changePassword = (e: FormEvent) => {
    e.preventDefault();
  };

  if (!user.data) return null;

  return (
    <>
      <AccounNav />
      <main className="flex flex-row">
        <div className="m-2 mr-10 border border-gray-700 bg-[#181A1B] p-5">
          <div className="border-b border-gray-700 ">
            <span className="text-2xl">Contact info</span>
          </div>
          <form method="post" onSubmit={updateUserData}>
            <div className="mt-10 flex flex-col">
              <div className="flex flex-col md:flex-row">
                <div className="md:mr-4">
                  <TextInput
                    label="First name"
                    name="fname"
                    value={user.data.fname || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextInput
                    label="Last name"
                    name="lname"
                    value={data.lname || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <TextInput
                label="Email"
                name="email"
                value={data.email || ""}
                onChange={handleChange}
              />
            </div>
            <Button onClick={updateUserData} className="mt-5">
              Save
            </Button>
          </form>
        </div>
        <div className="flex flex-col">
          <div className="m-2 h-fit w-[250px] border border-gray-700 bg-background2">
            <div className="p-5">
              <h1 className="text-2xl">User Info</h1>
              <div className="flex flex-col">
                <span>User id:</span>
                <span>{user.data.id}</span>
              </div>
              <div className="flex flex-col">
                <span>Username:</span>
                <span>{user.data.username}</span>
              </div>
            </div>
          </div>
          <div className="m-2 w-[250px] border border-gray-700 bg-background2 p-5">
            <h1 className="mb-4 text-xl">Change password</h1>
            <form>
              <div>
                <TextInput label="Current password" />
              </div>
              <div className="py-3">
                <TextInput label="New Password" />
                <TextInput label="Confirm Password" className="my-2" />
              </div>
              <Button onClick={changePassword}>Save</Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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

  if (session.user.role === "admin") {
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
};
