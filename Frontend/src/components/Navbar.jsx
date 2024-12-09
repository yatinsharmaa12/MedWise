import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Consult", path: "/consult" },
    { name: "Reports", path: "/reports" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">
                <span className="text-yellow-300">Med</span>wise
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Link
              to="/login"
              className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out"
            >
              Login
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white hover:bg-blue-700 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-white text-blue-600 hover:bg-blue-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ease-in-out mt-4"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({ name, path }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={path}
        className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium relative group transition-colors duration-300 ease-in-out"
      >
        {name}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 origin-left transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"
          initial={false}
          animate={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
        />
      </Link>
    </motion.div>
  );
}

export default Navbar;

