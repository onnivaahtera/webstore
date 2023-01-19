import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, type ChangeEvent } from "react";

import logo from "@images/candykeys.png";

import { signIn } from "next-auth/react";
import Router from "next/router";
import {
  MdAccountCircle,
  MdClose,
  MdMenu,
  MdSearch,
  MdShoppingCart,
} from "react-icons/md";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import DesktopNav from "./desktopNav";
import MobileNav from "./mobileNav";
import { useRouter } from "next/router";

export const Navbar = () => {
  const [input, setInput] = useState("");
  const { cartQuantity } = useShoppingCart();
  const router = useRouter();

  function openMenu() {
    const menu = document.getElementById("menu") as HTMLButtonElement;
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }

  const closeSearch = () => {
    const search = document.getElementById("search") as HTMLButtonElement;
    search.style.display = "none";
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        search.style.display = "none";
        setInput("");
      }
    });
    setInput("");
  };

  const openSearch = () => {
    const search = document.getElementById("search") as HTMLButtonElement;
    search.style.display = "block";
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const x = e.target.value;
    setInput(x);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeSearch();
    Router.push(`/product/search?query=${input}`);
  };

  return (
    <header>
      <div className="flex h-16 w-full overflow-hidden border-b-2 border-gray-700 transition-all lg:h-20">
        {/* Logo */}
        <div className="p-5">
          <Link href="/">
            <Image className="h-5 w-auto lg:h-8" src={logo} alt="" />
          </Link>
        </div>

        {/* Desktop categories */}
        <DesktopNav />

        {/* Buttons container */}
        <div className="flex">
          {/* Search */}
          <div className="absolute right-24 top-3 p-2 lg:right-24">
            <button onClick={openSearch}>
              <MdSearch className="text-3xl" />
            </button>
          </div>
          <div
            id="search"
            className="fixed top-0 left-0 z-10 hidden h-full w-full bg-black opacity-90"
          >
            <button
              className="absolute top-5 right-11 text-2xl"
              onClick={closeSearch}
            >
              <MdClose className="text-3xl" />
            </button>
            <div className="relative top-1/4 flex w-full justify-center">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="text border-b-2 border-gray-500 bg-black p-2 text-xl opacity-90 focus:outline-none active:border-none"
                  value={input || ""}
                  onChange={(e) => setInput(e.target.value)}
                />
              </form>
            </div>
          </div>

          {/* Account */}
          <div className="absolute right-16 top-3 p-2 lg:right-14">
            <button onClick={() => signIn()}>
              <MdAccountCircle className="text-3xl" />
            </button>
          </div>

          {/* Cart */}
          <div className="absolute right-8 top-3 p-2 lg:right-4 ">
            <button
              onClick={() => router.push("/cart")}
              style={{
                width: "2rem",
                height: "2rem",
                position: "relative",
              }}
            >
              <MdShoppingCart className="text-3xl" />
              <div
                className="d-flex justify-content-center align-items-center rounded-full bg-red-600"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          <div className="absolute right-0 top-3 p-2">
            <button className="block md:hidden" onClick={openMenu}>
              <MdMenu className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile categories */}
      <MobileNav />
    </header>
  );
};