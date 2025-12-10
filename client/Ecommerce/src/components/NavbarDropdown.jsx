import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ProfileAvatar from "../assets/profileAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserProfile } from "../api/getUserProfile";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  ChevronDownIcon 
} from "@heroicons/react/24/outline";

export default function NavbarDropdown() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    ...(userProfile?.data.role === "admin" 
      ? [{
          label: "Admin Dashboard",
          icon: ChartBarIcon,
          path: "/admin/dashboard",
          color: "text-purple-500"
        }]
      : []),
    {
      label: "My Account",
      icon: UserIcon,
      path: "/profile",
      color: "text-blue-500"
    },
    {
      label: "Order History",
      icon: ShoppingBagIcon,
      path: "/order-history",
      color: "text-green-500"
    },
    // {
    //   label: "Settings",
    //   icon: Cog6ToothIcon,
    //   path: "/settings",
    //   color: "text-gray-500"
    // },
  ];

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <MenuButton 
            className="flex items-center space-x-2 focus:outline-none group"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Avatar with Ring */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={ProfileAvatar}
                    alt="Profile"
                    className="w-9 h-9 object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Online Indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            </motion.div>
            
            {/* Chevron Animation */}
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.div>
          </MenuButton>

          <AnimatePresence>
            {open && (
              <MenuItems
                static
                as={motion.div}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl shadow-black/20 border border-white/20 dark:border-gray-700/20 overflow-hidden"
              >
                {/* User Info */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <img
                      src={ProfileAvatar}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {userProfile?.data.name || "User"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {userProfile?.data.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {menuItems.map((item) => (
                    <MenuItem key={item.label}>
                      {({ active }) => (
                        <Link
                          to={item.path}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            active 
                              ? 'bg-gray-100 dark:bg-gray-700/50 transform -translate-x-1' 
                              : ''
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-gray-700 dark:text-gray-200">
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </MenuItem>
                  ))}

                  {/* Logout Button */}
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          active 
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 transform -translate-x-1' 
                            : 'text-red-500 dark:text-red-400'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-red-500/10">
                          <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    )}
                  </MenuItem>
                </div>

                {/* Footer */}
                <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    v1.0 • Modern E-Commerce
                  </p>
                </div>
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}