// Site layout

import Head from 'next/head';
import Link from 'next/link';
import { Store } from '@/utils/Store';
import React, { useContext, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getError } from '@/utils/error';
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import MenuIcon from '@heroicons/react/24/outline/Bars3Icon';
import DotsVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [categories, setCategories] = useState([]);

  // Menu toggler
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Hide menu
  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', hideMenu);
    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  }, [isOpen]);

  // Load categories
  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  // Get category list
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };

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

  // Search functionality
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  // Main menu
  const navMenu = () => {
    return (
      <>
        {/* Search box */}
        <form
          onSubmit={submitHandler}
          className="mx-auto mr-3 mt-1 flex w-full justify-center md:hidden"
        >
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="rounded-tr-none rounded-br-none p-1 text-sm dark:text-black focus:ring-0"
            placeholder="Search products"
          />
          <button
            className="rounded rounded-tl-none rounded-bl-none bg-cyan-500 p-1 text-sm dark:text-black"
            type="submit"
            id="button-addon2"
          >
            <SearchIcon className="h-5 w-5"></SearchIcon>
          </button>
        </form>

        <div className="font-medium">
          <Link href="/about" className="p-2">
            About
          </Link>

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
            <Menu as="div" className="relative inline-block z-50">
              <Menu.Button>{session.user.name}</Menu.Button>

              <Menu.Items className="absolute right-0 w-56 origin-top-right bg-slate-100 text-black shadow-lg rounded">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>

                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order-history">
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
      </>
    );
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
          <nav
            className="flex justify-between relative items-center px-4 py-3 shadow-md"
            role="navigation"
          >
            <div className="flex items-center">
              <div
                className="cursor-pointer px-4  "
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <MenuIcon className="h-5 w-5 text-blue-500"></MenuIcon>
              </div>

              {/* Logo */}
              <Link href="/" className="text-lg font-bold">
                <Image
                  src="/images/sds-logo.png"
                  alt="Logo"
                  width="150"
                  height="52"
                  priority={true}
                ></Image>
              </Link>
            </div>

            {/* Search box */}
            <form
              onSubmit={submitHandler}
              className="mx-auto hidden justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm dark:text-black focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-cyan-500 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>

            <div className="cursor-pointer px-4 md:hidden" onClick={toggle}>
              <DotsVerticalIcon className="h-5 w-5 text-blue-500"></DotsVerticalIcon>
            </div>

            <div className="hidden items-center md:flex">{navMenu()}</div>

            {/* Offcanvas menu */}
            <div
              className={`fixed top-0 left-0 z-40 h-full w-[20rem] bg-gray-300 p-10 duration-300 ease-in-out dark:bg-gray-800 ${
                showSidebar ? 'translate-x-0' : 'translate-x-[-20rem]'
              }`}
            >
              <div className="mb-2 flex justify-between">
                <h2>Shopping By Categories</h2>

                <button onClick={() => setShowSidebar(!showSidebar)}>
                  <XCircleIcon className="h-5 w-5  "></XCircleIcon>
                </button>
              </div>

              <ul>
                {categories.map((category) => (
                  <li key={category} onClick={() => setShowSidebar(false)}>
                    <Link href={`/search?category=${category}`}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
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
