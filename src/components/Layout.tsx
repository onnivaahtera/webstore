import Head from "next/head";
import React, { type FC, type ReactNode } from "react";
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
      <div className="flex min-h-screen flex-col justify-between">
        <div>
          <Navbar />
          <main className="mx-4 mb-20 pb-16">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};
