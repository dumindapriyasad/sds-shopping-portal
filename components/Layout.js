import Head from 'next/head';
import Link from 'next/link';
import { Store } from '@/utils/Store';
import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Site layout
const Layout = ({ title, children }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

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

      {/* Error display */}
      <ToastContainer position="bottom-center" limit={1} />

      {/* Site wrapper */}
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          {/* Navbar */}
          <nav className="flex h-12 justify-between items-center px-4 shadow-md">
            {/* Logo */}
            <Link href="/" className="text-lg font-bold">
              SDS Shopping Portal
            </Link>

            <div>
              {/* Shopping cart */}
              <Link href="/cart" className="p-2">
                Cart
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
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
