import React from 'react'
import Header from '../header/header'

function Layout({ children }: any) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout