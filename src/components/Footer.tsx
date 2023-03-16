import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="border-t-2 border-gray-700 p-4 text-center">
      <div className="flex flex-row items-center justify-center">
        <span className="text-center">Onni Vaahtera |</span>
        <Link href="https://github.com/onnivaahtera/webstore">
          <FaGithub className="ml-1 text-xl" />
        </Link>
      </div>
    </footer>
  );
};
