import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { ShoppingBagIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-12 pb-8">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Column 1 - Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <ShoppingBagIcon className="w-6 h-6 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ShopCart
            </h2>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium lifestyle products for everyone — quality you can trust,
            pricing you'll love.
          </p>
        </div>

        {/* Column 2 - Shop */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/products" className="text-gray-400 hover:text-white transition flex items-center group">
                <span className="w-1 h-1 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                All Products
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-white transition flex items-center group">
                <span className="w-1 h-1 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-white transition flex items-center group">
                <span className="w-1 h-1 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Clothing
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-white transition flex items-center group">
                <span className="w-1 h-1 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home Decor
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Account */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Account</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/profile" className="text-gray-400 hover:text-white transition flex items-center group">
                <span className="w-1 h-1 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/order-history" className="text-gray-400 hover:text-white transition flex items-center group">
                <span className="w-1 h-1 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Order History
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-gray-400 hover:text-white transition flex items-center group">
                <span className="w-1 h-1 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get special offers and product updates
          </p>
          <div className="space-y-3">
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-700"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Subscribe
            </motion.button>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8 max-w-7xl mx-auto px-6"></div>

      {/* Social + Copyright */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-5">
          <motion.a
            whileHover={{ y: -3 }}
            href="#"
            className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 transition-all"
          >
            <FaFacebook className="text-lg" />
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            href="#"
            className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-500/20 transition-all"
          >
            <FaInstagram className="text-lg" />
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            href="#"
            className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-400/20 transition-all"
          >
            <FaTwitter className="text-lg" />
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            href="#"
            className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600/20 transition-all"
          >
            <FaLinkedin className="text-lg" />
          </motion.a>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} StyleCart — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;