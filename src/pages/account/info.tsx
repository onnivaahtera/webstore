import { useState, type ChangeEvent, type FormEvent, type FC } from "react";
import { trpc } from "../../utils/trpc";
import type { userSchema } from "../../types/user";
import { GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { TextInput } from "../../components/ui/TextInput";
import { Button } from "../../components/ui/Button";
import { AccounNav } from "../../components/Navbar/AccounNav";

interface infoProps {
  id: string;
  email: string;
}

const Customer: FC<infoProps> = ({ id }) => {
  type passType = {
    currPass: string;
    newPass: string;
    newPass2: string;
  };
  const [data, setData] = useState({} as userSchema);
  const [password, setPassword] = useState({} as passType);
  const user = trpc.user.getUserData.useQuery({ id: id });
  const update = trpc.user.updateUserData.useMutation();
  const pass = trpc.user.updatePassword.useMutation();

  const handleContactForm = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const handlePassForm = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const updateUserData = (e: FormEvent) => {
    e.preventDefault();
    console.log(data);

    update.mutate({
      fname: data.fname,
      lname: data.lname,
      streetAddress: data.streetAddress,
      postalCode: data.postalCode,
      city: data.city,
      email: data.email,
      phone: data.phone,
    });
  };

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();

    pass.mutate({
      email: user.data!.email,
      currPass: password.currPass,
      newPass: password.newPass,
      newPass2: password.newPass2,
    });
    setPassword({} as passType);
  };

  if (!user.data) return <div>Error loading data</div>;

  return (
    <>
      <AccounNav role="Customer" />
      <main className="flex flex-col overflow-hidden md:flex-row md:justify-center">
        {/* Contact info container */}
        <div className="my-5  border border-gray-700 bg-background2 p-5 lg:w-[700px] 2xl:w-[1000px]">
          <div className="border-b border-gray-700 ">
            <span className="text-2xl">Contact info</span>
          </div>
          {/* Form */}
          <form method="post" onSubmit={updateUserData}>
            <div className="m-5">
              <div className="mb-3 grid grid-cols-2 gap-5">
                <div className="w-full">
                  <TextInput
                    label="First name"
                    name="fname"
                    defaultValue={user.data.fname}
                    onChange={handleContactForm}
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="Last name"
                    name="lname"
                    defaultValue={user.data.lname}
                    onChange={handleContactForm}
                  />
                </div>
              </div>
              <TextInput
                label="Address"
                name="address"
                defaultValue={user.data.streetAddress}
                onChange={handleContactForm}
                className="my-5"
              />
              <div className="mb-3 grid grid-cols-2 gap-5">
                <div className="w-full">
                  <TextInput
                    label="Postal code"
                    name="postalcode"
                    defaultValue={user.data.postalCode}
                    onChange={handleContactForm}
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="City"
                    name="city"
                    defaultValue={user.data.city}
                    onChange={handleContactForm}
                  />
                </div>
              </div>
              <div className="my-5">
                <TextInput
                  label="Email"
                  name="email"
                  defaultValue={user.data.email}
                  onChange={handleContactForm}
                />
              </div>
              <TextInput
                label="Phone number"
                name="phone"
                defaultValue={user.data.phone}
                onChange={handleContactForm}
              />
              <Button onClick={updateUserData} type="button" className="mt-5">
                Save
              </Button>
            </div>
          </form>
        </div>
        {/* User info container */}
        <div className="flex flex-col md:w-[300px]">
          <div className="my-5 h-fit w-full border border-gray-700 bg-background2 p-5 md:m-5">
            <h1 className="text-2xl">User Info</h1>
            <div className="flex flex-col">
              <span>User id:</span>
              <span>{user.data.id}</span>
            </div>
            <div className="flex flex-col">
              <span>Username:</span>
              <span>{user.data.email}</span>
            </div>
          </div>
          {/* Password container */}
          <div className="my-5 w-full border border-gray-700 bg-background2 p-5 md:m-5">
            <h1 className="mb-4 text-xl">Change password</h1>
            <form>
              <div>
                <TextInput
                  label="Current password"
                  name="currPass"
                  value={password.currPass || ""}
                  onChange={handlePassForm}
                />
              </div>
              <div className="py-3">
                <TextInput
                  label="New Password"
                  name="newPass"
                  value={password.newPass || ""}
                  onChange={handlePassForm}
                />
                <TextInput
                  label="Confirm Password"
                  name="newPass2"
                  className="my-2"
                  value={password.newPass2 || ""}
                  onChange={handlePassForm}
                />
              </div>
              {pass.isSuccess !== false && (
                <span>
                  {pass.isSuccess
                    ? "Password changed successfully"
                    : "Password change failed"}
                </span>
              )}
              <Button onClick={changePassword} type="button">
                Save
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Customer;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // get session from getServerAuthSession
  const session = await getServerAuthSession(ctx);

  return {
    props: {
      id: session?.user.userId,
    },
  };
};
