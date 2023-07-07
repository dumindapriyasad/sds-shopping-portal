import Head from 'next/head';
import Link from 'next/link';
import { Store } from '@/utils/Store';
import React, { useContext, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

// Site layout
export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Keep update cart items
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  // Sign out functionality
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

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
          <nav className="flex justify-between items-center px-4 py-3 shadow-md">
            {/* Logo */}
            <Link href="/" className="text-lg font-bold">
              <Image
                src="/images/sds-logo.png"
                alt="Logo"
                width="150"
                height="52"
              ></Image>
            </Link>

            <div className="font-medium">
              {/* Shopping cart */}
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Dropdown menu */}
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button>{session.user.name}</Menu.Button>

                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-slate-100 text-black shadow-lg rounded">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>

                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>

                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}

                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>

        {/* Main container */}
        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-14 justify-center items-center shadow-inner">
          <p>Copyright © Salon Delight Style</p>
        </footer>
      </div>
    </>
  );
}
