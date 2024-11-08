import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="container mx-auto px-6">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Medwise</h3>
            <p className="text-gray-400">
              Medwise is your trusted platform for managing your health and connecting with doctors. Our mission is to make healthcare more accessible, secure, and efficient for everyone.
            </p>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">Home</a>
              </li>
              <li>
                <a href="#consultation" className="text-gray-400 hover:text-blue-400 transition duration-300">Consultation</a>
              </li>
              <li>
                <a href="#reports" className="text-gray-400 hover:text-blue-400 transition duration-300">Reports</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-blue-400 transition duration-300">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500 transition duration-300">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700 transition duration-300">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 transition duration-300">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Medwise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
