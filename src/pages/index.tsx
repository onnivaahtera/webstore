import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";

import Products from "../components/products/products";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>AAAA</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Layout>
        <main>
          <Products />

          <div>
            <Link href="/category/[id]" as="/category/gpu">
              gpu
            </Link>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
