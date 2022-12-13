import React, { useState } from "react";
import type { Product } from "../../types/product";
import { trpc } from "../../utils/trpc";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({} as Product);
  const [category, setCategory] = useState(0);

  const mutation = trpc.product.addProduct.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewProduct((values) => ({ ...values, [name]: value }));
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: newProduct.name,
      price: newProduct.price,
      desc: newProduct.desc,
      image: newProduct.image,
      category: category,
    });
    console.log(category);
  };

  return (
    <>
      <main>
        <div className="flex items-center justify-center">
          <form onSubmit={addProduct}>
            <div>
              Product name:{" "}
              <input
                type="text"
                name="name"
                className="my-2 text-black"
                onChange={handleChange}
                value={newProduct.name || ""}
              />
            </div>
            <div>
              Price:{" "}
              <input
                type="number"
                name="price"
                className="my-2 text-black"
                onChange={handleChange}
                value={newProduct.price || ""}
              />
            </div>
            <div>
              Description:{" "}
              <input
                type="text"
                name="desc"
                className="my-2 text-black"
                onChange={handleChange}
                value={newProduct.desc || ""}
              />
            </div>
            <div>
              Image url:{" "}
              <input
                type="text"
                name="image"
                className="my-2 text-black"
                onChange={handleChange}
                value={newProduct.image || ""}
              />
            </div>
            <div>
              Category:{" "}
              <select
                name="category"
                className="my-2 p-2 text-black"
                onChange={(e) => setCategory(e.target.options.selectedIndex)}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Choose category
                </option>
                <option value="graphics-card">Graphics Card</option>
                <option value="motherboard">Motherboard</option>
                <option value="processor">Processor</option>
              </select>
            </div>
            <button type="submit">Add Product </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddProduct;
