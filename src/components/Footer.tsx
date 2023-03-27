import Link from "next/link";
import React, { type FC } from "react";
import { FaGithub } from "react-icons/fa";

export const Footer: FC = () => {
  return (
    <footer className="flex h-[65px] items-center justify-center border-t-2 border-background2">
      <div className="flex flex-row items-center justify-center">
        <span className="text-center">Copyright @ 2023: Onni Vaahtera |</span>
        <Link href="https://github.com/onnivaahtera/webstore">
          <FaGithub className="ml-1 text-xl hover:opacity-70" />
        </Link>
      </div>
    </footer>
  );
};
