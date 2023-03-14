import Head from "next/head";
import React, { FC, ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Webstore</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col justify-between">
        <Navbar />
        <main className="mx-4 mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
};
