import React from "react";
import { Link } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown.jsx";
import { motion as Motion} from "framer-motion";
import { ShoppingBagIcon, HomeIcon, SparklesIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <Motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/20 dark:border-gray-700/20 shadow-lg shadow-black/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Animation */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <ShoppingBagIcon className="w-6 h-6 text-white" />
            </Motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ShopCart
            </span>
            <SparklesIcon className="w-5 h-5 text-cta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Navigation Links with Modern Indicators */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { path: "/", label: "Home", icon: HomeIcon },
              { path: "/products", label: "Products", icon: ShoppingBagIcon },
              { path: "/cart", label: "Cart", icon: ShoppingBagIcon },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 rounded-lg group"
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </div>
                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {token ? (
              <NavbarDropdown />
            ) : (
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold overflow-hidden group"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center space-x-2">
                    <span>Login</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </span>
                </Link>
              </Motion.div>
            )}
          </div>

        </div>
      </div>
    </Motion.nav>
  );
};

export default Navbar;