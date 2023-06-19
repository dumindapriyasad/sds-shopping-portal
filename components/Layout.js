import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

// Site layout
const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? title + ' - SDS Shopping Portal' : 'SDS Shopping Portal'}
        </title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Site wrapper */}
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          {/* Navbar */}
          <nav className="flex h-12 justify-between items-center px-4 shadow-md">
            <Link href="/" className="text-lg font-bold">
              SDS Shopping Portal
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
              </Link>
              <Link href="login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>

        {/* Main container */}
        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © Salon Delight Style</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
