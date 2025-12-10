import React from "react";
import { Link } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown.jsx";
import { motion as Motion } from "framer-motion";
import { 
  ChartBarIcon, 
  CubeIcon, 
  ClipboardDocumentListIcon, 
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

const AdminNavbar = () => {
  const token = localStorage.getItem("token");

  return (
    <Motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-50 border-b border-gray-700 shadow-2xl shadow-black/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          
          {/* Admin Brand with Back to Site Option */}
          <div className="flex items-center space-x-6">
            <Link to="/admin/dashboard" className="flex items-center space-x-3 group">
              <Motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg"
              >
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </Motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Admin Console
                </h1>
                {/* <p className="text-xs text-gray-400">v2.1 • Secure Dashboard</p> */}
              </div>
            </Link>
            
            {/* Back to Main Site */}
            <Link 
              to="/" 
              className="hidden md:flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Site</span>
            </Link>
          </div>

          {/* Admin Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { 
                path: "/admin/dashboard/create-product", 
                label: "Products", 
                icon: CubeIcon,
                count: "12" // You can make this dynamic
              },
              { 
                path: "/admin/dashboard/order", 
                label: "Orders", 
                icon: ClipboardDocumentListIcon,
                count: "5",
                badge: "new"
              },
              { 
                path: "/admin/dashboard", 
                label: "Users", 
                icon: UserGroupIcon,
                count: "42"
              },
              // { 
              //   path: "/admin/dashboard/analytics", 
              //   label: "Analytics", 
              //   icon: ChartBarIcon 
              // },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2.5 rounded-lg group"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-cta rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                  {item.count && (
                    <span className="px-2 py-0.5 text-xs bg-gray-700 rounded-full group-hover:bg-cyan-900 transition-colors">
                      {item.count}
                    </span>
                  )}
                </div>
                
                {/* Active/Hover Indicator */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Admin Menu Button */}
          <div className="lg:hidden">
            <Motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-gray-300"></span>
                <span className="block w-6 h-0.5 bg-gray-300"></span>
                <span className="block w-4 h-0.5 bg-gray-300 ml-auto"></span>
              </div>
            </Motion.button>
          </div>

          {/* Auth Section with Admin Badge */}
          <div className="flex items-center space-x-4">
            {/* Admin Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-cyan-300">Admin Mode</span>
            </div>
            
            {/* User Dropdown */}
            {token ? (
              <div className="relative">
                <NavbarDropdown />
                {/* Admin Crown Indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-gray-900">A</span>
                </div>
              </div>
            ) : (
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold overflow-hidden group"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center space-x-2">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>Admin Login</span>
                  </span>
                </Link>
              </Motion.div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Admin Menu (Optional - can be expanded) */}
      <div className="lg:hidden px-4 pb-3 border-t border-gray-700">
        <div className="flex justify-around pt-3">
          {[
            { path: "/admin/dashboard/create-product", label: "Products", icon: CubeIcon },
            { path: "/admin/dashboard/order", label: "Orders", icon: ClipboardDocumentListIcon },
            { path: "/admin/dashboard", label: "Users", icon: UserGroupIcon },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <item.icon className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-gray-300">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </Motion.nav>
  );
};

export default AdminNavbar;