import Head from "next/head";

const Error = () => {
  return (
    <>
      <Head>
        <title>No page</title>
      </Head>

      <div className="mt-28 flex w-full items-center justify-center pt-2 text-6xl text-white">
        <span>404</span>
        <span>Page not found</span>
      </div>
    </>
  );
};

export default Error;
