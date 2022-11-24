import Image from "next/image";
import Link from "next/link";
import { type ChangeEvent, useState } from "react";

import logo_filler from "@images/logo_filler.png";
import menu from "@images/menu.png";
import search from "@images/search.png";
import profile from "@images/profile.png";
import cart from "@images/cart.png";

import SearchResults from "./search";
import { trpc } from "../../utils/trpc";

const Header = () => {
  const [input, setInput] = useState("");

  const category = trpc.product.category.useQuery();

  const openMenu = () => {
    const menu = document.getElementById("menu") as HTMLButtonElement;
    menu.style.width = "250px";
  };

  const openSearch = () => {
    const search = document.getElementById("search") as HTMLInputElement;
    if (search.style.display === "block") {
      search.style.display = "none";
    } else {
      search.style.display = "block";
    }
  };

  const closeMenu = () => {
    const menu = document.getElementById("menu") as HTMLButtonElement;
    menu.style.width = "0";
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const x = e.target.value;
    setInput(x);
  };

  return (
    <div>
      <div className="h-22 flex bg-slate-900">
        <div className="categories">
          <button className="" onClick={openMenu}>
            <Image src={menu} alt="menu" />
          </button>
        </div>

        <div
          className="fixed z-50 h-full w-0 overflow-hidden bg-slate-900 transition-all"
          id="menu"
        >
          <button onClick={closeMenu} className="p-2 text-2xl text-white">
            Close
          </button>

          <div id="categories">
            {category.data?.map((val, key) => (
              <div key={key} className="p-2 text-xl text-white">
                <Link href={`/category/${val.name}`}>{val.name}</Link>
              </div>
            ))}
          </div>
        </div>

        <Link href="/">
          <Image src={logo_filler} alt="logo" className="" />
        </Link>

        <div className="mx-auto mt-2 hidden max-w-md md:block" id="search">
          <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
            <div className="grid h-full w-12 place-items-center text-gray-300"></div>
            <input
              className="h-full w-full text-sm text-gray-700 outline-none"
              type="text"
              placeholder="Search..."
              onChange={inputHandler}
            />
          </div>
        </div>

        <div className="ml-auto flex">
          <button className="block md:hidden" onClick={openSearch}>
            <Image src={search} alt="search" />
          </button>

          <div className="p-2">
            <Link href="/account/">
              <Image src={profile} alt="profile" />
            </Link>
          </div>

          <div className="p-2">
            <Link href="/cart">
              <Image src={cart} alt="shopping cart" />
            </Link>
          </div>
        </div>
      </div>
      <SearchResults input={input} />
    </div>
  );
};

export default Header;
