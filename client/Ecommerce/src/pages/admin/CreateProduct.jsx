import React, { useState } from 'react'
import CreateNewProduct from '../../components/createNewProduct.jsx'
import UpdateExistingProduct from '../../components/updateExistingProduct.jsx'
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { PlusCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const CreateProduct = () => {
  const [isCreating, setIsCreating] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Tab Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Product <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Manager</span>
              </h1>
              <p className="text-gray-600 mt-2">
                {isCreating ? 'Add new products to your store' : 'Update or remove existing products'}
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-2 p-2 bg-gray-100 rounded-2xl w-fit">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(true)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  isCreating
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                    : 'text-gray-700 hover:bg-white'
                }`}
              >
                <PlusCircleIcon className="w-5 h-5" />
                Create New
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(false)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  !isCreating
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                    : 'text-gray-700 hover:bg-white'
                }`}
              >
                <PencilSquareIcon className="w-5 h-5" />
                Update Existing
              </motion.button>
            </div>
          </div>
        </div>

        {/* Active Tab Indicator */}
        <div className="relative">
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200"></div>
          <motion.div
            animate={{
              x: isCreating ? '0%' : '100%',
              width: '50%'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div
        key={isCreating ? "create" : "update"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="py-8"
      >
        {isCreating ? (
          <CreateNewProduct />
        ) : (
          <UpdateExistingProduct />
        )}
      </motion.div>

      {/* Quick Stats Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">📦</div>
              <div className="text-3xl font-bold text-gray-900 mt-2">250+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">🏷️</div>
              <div className="text-3xl font-bold text-gray-900 mt-2">12</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">⚡</div>
              <div className="text-3xl font-bold text-gray-900 mt-2">24/7</div>
              <div className="text-gray-600">Management</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateProduct