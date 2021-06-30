import { useState } from "react";
import Link from "next/link";
import UserIcon from "./ui/user";
import FavoriteIcon from "./ui/favorite";
import { getSession, signIn, signOut, useSession } from "next-auth/client";

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const handleMenu = () => setMenuOpen(!menuOpen);
  const handleOpen = () => setCartOpen(!cartOpen);

  const [session, loading] = useSession();
  console.log("layout", session);
  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="w-full text-gray-700 md:text-left text-2xl font-semibold">
                Pulp Inc.
              </div>
            </Link>
            <div className="flex items-center justify-end w-full">
              <button className="text-gray-600">
                <UserIcon />
                {session ? <span>{session.user.email}</span> : null}
              </button>
              <button className="text-gray-600 ml-4">
                <FavoriteIcon />
              </button>
              {/* shopping cart icon */}
              <button
                onClick={handleOpen}
                className="text-gray-600 focus:outline-none mx-4 sm:mx-0"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              <div className="flex sm:hidden">
                <button
                  onClick={handleMenu}
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav
            className={`${
              menuOpen ? "" : "hidden"
            } sm:flex sm:justify-center sm:items-center mt-4 `}
          >
            <div className="flex flex-col sm:flex-row">
              <Link href="/">
                <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                  Home
                </a>
              </Link>
              <Link href="/products">
                <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                  Shop
                </a>
              </Link>
              <Link href="/about">
                <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                  About
                </a>
              </Link>
              {!session && (
                <div className="lg:-mt-2 lg:ml-4">
                  <Link href="/login">
                    <button className="border font-mono p-2 w-1/3 bg-lime-300 border-black shadow-offset-black lg:w-24 lg:mr-8">
                      Log In
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="ml-2 border font-mono p-2 w-1/3 bg-lime-300 border-black shadow-offset-black lg:w-24 mr-4 lg:mr-8">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
              {session && (
                <>
                  <button
                    className="border font-mono mt-2 p-2 w-1/3 bg-lime-300 border-black shadow-offset-black lg:w-24 mr-4 lg:mr-8 lg:-mt-2 lg:ml-4"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
      {/*
      // This Cart doesn't really work… yet!
      <Cart cartOpen={cartOpen} handleOpen={handleOpen} />
      */}
      <main className="my-8">{children}</main>
      <footer className="bg-gray-200">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a
            href="#"
            className="text-xl font-bold text-gray-500 hover:text-gray-400"
          >
            Pulp Inc.
          </a>
          <p className="py-2 text-gray-500 sm:py-0">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
