import Link from "next/link";
import React from "react";

function MobileNav() {
  return (
    <div className="z-50 m-2">
      <div id="menu" className="hidden">
        <div className="overflow-y-scroll">
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
          <div>
            <Link
              className="hover:underline"
              href="/category/[id]"
              as="/category/motherboard"
            >
              Motherboards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
