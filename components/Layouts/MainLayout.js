import React from 'react'
import Header from './Header'
import Footer from './Footer'

function MainLayout({ children,token }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    )
}

export default MainLayout