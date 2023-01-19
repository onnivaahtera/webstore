import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Layout } from "../components/layout";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ShoppingCartProvider>
      <Layout>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Layout>
    </ShoppingCartProvider>
  );
};

export default trpc.withTRPC(MyApp);
