import React, { FC, ReactNode } from "react";
import Footer from "./footer";
import { Navbar } from "./Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        <Navbar />
        <main className="mx-4 mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
};
