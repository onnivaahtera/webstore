import React, { FormEvent, useState, FC, ChangeEvent } from "react";
import { GetServerSidePropsContext } from "next/types";
import { AccounNav } from "../../../components/Navbar/AccounNav";
import { TextInput } from "../../../components/ui/TextInput";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { newProduct } from "../../../types/product";
import { trpc } from "../../../utils/trpc";

const Admin: FC = () => {
  const [product, setProduct] = useState({} as newProduct);
  const [category, setCategory] = useState("1");
  const newProduct = trpc.product.newProduct.useMutation();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newProduct.mutate({
      name: product.name,
      url: product.url,
      price: parseInt(product.price),
      image: product.image,
      category: parseInt(category),
      desc: product.desc,
    });
    console.log(product);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <AccounNav role="Admin" />
      <div>Logged in as Admin user</div>
      <main>
        <div>
          <form>
            <div className="my-8 flex flex-col rounded-xl bg-background2 p-5">
              <span className="mb-4 text-xl">Add new product</span>
              <TextInput
                label="Product name"
                value={product.name || ""}
                onChange={handleChange}
              />
              <TextInput label="Product url" />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Admin;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user.role !== "Admin") {
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
