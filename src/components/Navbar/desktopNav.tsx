import Link from "next/link";
import React from "react";

function DesktopNav() {
  return (
    <div className="hidden text-gray-500 md:block">
      <div className="flex p-7" id="categories">
        <div className="px-2">
          <Link
            className="hover:underline"
            href="/category/[id]"
            as="/category/graphics-card"
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
      </div>
    </div>
  );
}

export default DesktopNav;
