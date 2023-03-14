import Link from "next/link";
import React from "react";

export const MobileNav = () => {
  return (
    <div className="z-50 m-2">
      <div id="menu" className="hidden">
        <div className="">
          <div>
            <Link
              className="hover:underline"
              href="/category/[id]"
              as="/category/graphics-card"
            >
              Graphics Cards
            </Link>
          </div>
          <div>
            <Link
              className="hover:underline"
              href="/category/[id]"
              as="/category/processor"
            >
              Processors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
