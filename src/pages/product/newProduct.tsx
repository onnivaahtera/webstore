import { GetServerSidePropsContext } from "next/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import type { newProduct } from "../../types/product";
import { trpc } from "../../utils/trpc";

export default function NewProduct() {
  const [value, setValue] = useState({} as newProduct);
  const [category, setCategory] = useState("1");
  const mutation = trpc.product.addProduct.useMutation();

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: value.name,
      url: value.url,
      price: parseInt(value.price),
      image: value.image,
      category: parseInt(category),
      desc: value.desc,
    });
    console.log(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue((values) => ({ ...values, [name]: value }));
  };

  return (
    <main className="mt-[100px] flex items-center justify-center">
      <form onSubmit={submitForm}>
        <div className="flex flex-col py-2">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            className="w-[250px] rounded text-black"
            value={value.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="url">URL Friendly name: </label>
          <input
            type="text"
            name="url"
            className="w-[250px] rounded text-black"
            value={value.url || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            className="w-[250px] rounded text-black"
            value={value.price || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="image">Image url: </label>
          <input
            type="text"
            name="image"
            className="w-[250px] rounded text-black"
            value={value.image || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="category">Category: </label>
          <select
            name="category"
            id="category"
            defaultValue="1"
            className="rounded text-black"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="1">Graphics Card</option>
            <option value="2">Processor</option>
          </select>
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="desc">Description: </label>
          <input
            type="text"
            name="desc"
            className="h-[100px] w-[250px] rounded text-black"
            value={value.desc || ""}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={submitForm}
          className="h-[40px] w-[100px] rounded bg-blue-600"
        >
          Save
        </button>
      </form>
    </main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user.username !== "admin") {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  return {
    props: {},
  };
};
