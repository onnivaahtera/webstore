import Image from "next/image";
import Link from "next/link";
import { type ChangeEvent, useState } from "react";

import SearchResults from "./search";

import logo from "@images/candykeys.png";

import {
  MdAccountCircle,
  MdShoppingCart,
  MdSearch,
  MdMenu,
} from "react-icons/md";
import { signIn } from "next-auth/react";

const Header = () => {
  const [input, setInput] = useState("");

  function openMenu() {
    const menu = document.getElementById("menu") as HTMLButtonElement;
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }

  const openSearch = () => {
    const search = document.getElementById("search") as HTMLInputElement;
    if (search.style.display === "block") {
      search.style.display = "none";
    } else {
      search.style.display = "block";
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const x = e.target.value;
    setInput(x);
  };

  return (
    <div className="flex h-20 w-full overflow-hidden border-b-2 border-gray-700 lg:h-24">
      {/* Logo */}
      <div className="p-7">
        <Link href="/">
          <Image className="h-5 w-auto" src={logo} alt="" />
        </Link>
      </div>

      {/* Desktop categories */}
      <div className="hidden text-gray-500 lg:block">
        <div className="flex p-7" id="categories">
          <div className="px-2">
            <Link
              className="hover:underline"
              href="/category/[id]"
              as="/category/graphics-cards"
            >
              Graphics Cards
            </Link>
          </div>
          <div className="px-2">
            <Link
              className="hover:underline"
              href="/category/[id]"
              as="/category/processors"
            >
              Processors
            </Link>
          </div>
          <div className="px-2">
            <Link
              className="hover:underline"
              href="/category/[id]"
              as="/category/motherboards"
            >
              Motherboards
            </Link>
          </div>
        </div>
      </div>

      {/* Searchbar */}
      <div className="mx-auto mt-2 hidden max-w-md" id="search">
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

      {/* Search results */}
      <div>
        <SearchResults input={input} />
      </div>

      {/* Buttons container */}
      <div className="flex">
        {/* Search */}
        <div className="absolute right-24 top-5 p-2 lg:right-24">
          <button onClick={openSearch}>
            <MdSearch className="text-3xl" />
          </button>
        </div>

        {/* Account */}
        <div className="absolute right-16 top-5 p-2 lg:right-14">
          <button onClick={() => signIn()}>
            <MdAccountCircle className="text-3xl" />
          </button>
        </div>

        <Link href="/account">Account</Link>

        {/* Cart */}
        <div className="absolute right-8 top-5 p-2 lg:right-4 ">
          <Link href="/product/cart">
            <MdShoppingCart className="text-3xl" />
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="absolute right-0 top-5 p-2">
          <button className="block lg:hidden" onClick={openMenu}>
            <MdMenu className="text-3xl" />
          </button>
        </div>

        {/* Mobile categories */}
        <div>
          <div id="menu" className="hidden">
            <div>
              <div>
                <Link
                  className="hover:underline"
                  href="/category/[id]"
                  as="/category/gpu"
                >
                  gpu
                </Link>
              </div>
              <div>
                <Link
                  className="hover:underline"
                  href="/category/[id]"
                  as="/category/processors"
                >
                  processors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
