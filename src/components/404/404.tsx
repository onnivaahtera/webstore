import Head from 'next/head'

const Error = () => {
    return (
        <>
            <Head>
                <title>No page</title>

            </Head>

            <div className="flex w-full items-center justify-center pt-2 mt-28 text-6xl text-white">
                <span>Wrong product name</span>
            </div>
        </>
    )
}

export default Error
