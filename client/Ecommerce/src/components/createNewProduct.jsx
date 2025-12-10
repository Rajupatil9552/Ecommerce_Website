import React, { useState } from 'react'
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { 
  PlusCircleIcon, 
  PhotoIcon, 
  TagIcon, 
  CurrencyDollarIcon,
  CubeIcon,
  ArchiveBoxIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

const CreateNewProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Living' },
    { value: 'beauty', label: 'Beauty & Care' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'books', label: 'Books & Media' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
            <PlusCircleIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Add New Product</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Create <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">New Product</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill in the details below to add a new product to your store
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl shadow-black/5 overflow-hidden border border-gray-200"
        >
          {/* Form Header */}
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <CubeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                <p className="text-sm text-gray-500">Enter all required information</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <TagIcon className="w-5 h-5 text-primary" />
                Product Name
              </label>
              <input 
                type="text" 
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder-gray-400"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-semibold">
                <DocumentTextIcon className="w-5 h-5 text-primary" />
                Description
              </label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder-gray-400 resize-none"
                placeholder="Enter detailed product description"
                required
              />
            </div>

            {/* Price and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder-gray-400"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <CubeIcon className="w-5 h-5 text-primary" />
                  Category
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-700 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stock and Image Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stock Quantity */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <ArchiveBoxIcon className="w-5 h-5 text-primary" />
                  Stock Quantity
                </label>
                <input 
                  type="number" 
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder-gray-400"
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <PhotoIcon className="w-5 h-5 text-primary" />
                  Image URL
                </label>
                <input 
                  type="text" 
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder-gray-400"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>

            {/* Preview Image */}
            {formData.imageUrl && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <label className="text-gray-700 font-semibold">Image Preview</label>
                <div className="relative h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden">
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '';
                    }}
                  />
                  {!formData.imageUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Enter a valid image URL to see preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Form Actions */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Create Product
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Form Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-primary">💡</span> Tips for Better Products
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Use high-quality images for better conversion</li>
            <li>• Write detailed descriptions with key features</li>
            <li>• Set competitive pricing based on market research</li>
            <li>• Choose accurate categories for better discoverability</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateNewProduct