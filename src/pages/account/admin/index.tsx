import React, {
  type FormEvent,
  useState,
  type FC,
  type ChangeEvent,
} from "react";
import { AccounNav } from "../../../components/Navbar/AccounNav";
import { TextInput } from "../../../components/ui/TextInput";
import { newProduct } from "../../../types/product";
import { trpc } from "../../../utils/trpc";
import { Button } from "../../../components/ui/Button";
import type { passType } from "../../../types/user";

const Admin: FC = () => {
  const [product, setProduct] = useState({} as newProduct);
  const [category, setCategory] = useState("graphics-card");
  const [password, setPassword] = useState({} as passType);
  const newProduct = trpc.product.newProduct.useMutation();
  const pass = trpc.user.updateAdminPass.useMutation();

  const addProduct = (e: FormEvent) => {
    e.preventDefault();
    newProduct.mutate({
      name: product.name,
      url: product.url,
      price: parseInt(product.price),
      image: product.image,
      category: category,
      desc: product.desc,
    });
  };

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();

    pass.mutate({
      currPass: password.currPass,
      newPass: password.newPass,
      newPass2: password.newPass2,
    });
    setPassword({} as passType);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct((values) => ({ ...values, [name]: value }));
  };

  const handlePassForm = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <AccounNav role="Admin" />
      <main className="flex flex-col overflow-hidden md:flex-row md:justify-center">
        <div className="my-5 border border-gray-700 bg-background2 p-5 lg:w-[700px] 2xl:w-[1000px]">
          <div>
            <span>New product</span>
          </div>
          <form>
            <div className="m-5">
              <div className="mb-5 grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-3">
                <TextInput
                  label="Product name"
                  name="name"
                  value={product.name || ""}
                  onChange={handleChange}
                />
                <TextInput
                  label="Product url"
                  name="url"
                  value={product.url || ""}
                  onChange={handleChange}
                />
                <TextInput
                  label="Price"
                  name="price"
                  value={product.price || ""}
                  onChange={handleChange}
                />
                <TextInput
                  label="Image Url"
                  name="image"
                  value={product.image || ""}
                  onChange={handleChange}
                />
              </div>
              <TextInput
                className="h-fit"
                label="Description"
                name="desc"
                value={product.desc || ""}
                onChange={handleChange}
              />
              <select
                defaultValue={"graphics-card"}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-3 block w-full appearance-none rounded-lg border border-gray-700 bg-background2 p-3 text-sm text-white hover:cursor-pointer focus:border-blue-600 focus:outline-none focus:ring-0"
              >
                <option className="hover:cursor-pointer" value="graphics-card">
                  Graphics Card
                </option>
                <option className="hover:cursor-pointer" value="processor">
                  Processor
                </option>
              </select>
            </div>
            <Button
              type="button"
              className="mt-4 h-fit w-fit p-2 text-sm"
              onClick={addProduct}
            >
              Add Product
            </Button>
          </form>
          {newProduct.data?.message.toString()}
        </div>
        {/* Change password */}
        <div className="my-5 border border-gray-700 bg-background2 p-5 md:m-5">
          <h1 className="mb-4 text-xl">Change Admin password</h1>
          <form>
            <div>
              <TextInput
                type="password"
                label="Current password"
                name="currPass"
                value={password.currPass || ""}
                onChange={handlePassForm}
              />
            </div>
            <div className="py-3">
              <TextInput
                type="password"
                label="New Password"
                name="newPass"
                value={password.newPass || ""}
                onChange={handlePassForm}
              />
              <TextInput
                type="password"
                label="Confirm Password"
                name="newPass2"
                className="my-2"
                value={password.newPass2 || ""}
                onChange={handlePassForm}
              />
            </div>
            <Button onClick={changePassword} type="submit" className="mr-5">
              Save
            </Button>
            {pass.data?.message.toString()}
          </form>
        </div>
      </main>
    </>
  );
};

export default Admin;
