import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-black-600 text-white shadow-md p-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white text-black rounded-box mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <Link to="/" className="hover:bg-blue-500 hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/consult" className="hover:bg-blue-500 hover:text-white">Consult</Link>
            </li>
            <li>
              <Link to="/reports" className="hover:bg-blue-500 hover:text-white">Reports</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:bg-blue-500 hover:text-white">Dashboard</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">Medwise</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/consult" className="hover:text-gray-200">Consult</Link>
          </li>
          <li>
            <Link to="/reports" className="hover:text-gray-200">Reports</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn bg-white text-blue-600 hover:bg-gray-100 border-none rounded-md px-4 py-2 shadow-md">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
