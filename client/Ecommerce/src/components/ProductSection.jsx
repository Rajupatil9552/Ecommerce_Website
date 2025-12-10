import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import { fetchProducts } from "../api/fetchProduct.js";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  AdjustmentsHorizontalIcon,
  ChevronDownIcon 
} from "@heroicons/react/24/outline";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  
  // Sample categories - you can make these dynamic
  const categories = [
    { id: "all", name: "All Products", count: 0 },
    { id: "electronics", name: "Electronics", count: 12 },
    { id: "fashion", name: "Fashion", count: 8 },
    { id: "home", name: "Home & Living", count: 6 },
    { id: "beauty", name: "Beauty", count: 4 },
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts();
        setProducts(response.data);
        
        // Update all products count
        categories[0].count = response.data.length;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
          <span className="text-sm font-semibold text-primary">🔥 Trending Now</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="block text-gray-900">Discover Our</span>
          <span className="block bg-gradient-to-r from-primary via-secondary to-cta bg-clip-text text-transparent">
            Premium Collection
          </span>
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Handpicked products that combine quality, style, and innovation for your modern lifestyle.
        </p>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-sm">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  filter === category.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  {category.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    filter === category.id 
                      ? "bg-white/30" 
                      : "bg-gray-100"
                  }`}>
                    {category.count}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" 
                    ? "bg-primary text-white" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" 
                    ? "bg-primary text-white" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <FunnelIcon className="w-5 h-5" />
                <span className="font-medium">Sort By</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        /* Products Grid */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`grid gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            /* No Products State */
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <FunnelIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No products match your current filter. Try selecting a different category.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Show All Products
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Results Count */}
      {!loading && filteredProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600 text-center">
            Showing <span className="font-bold text-primary">{filteredProducts.length}</span> of{" "}
            <span className="font-bold">{products.length}</span> products
            {filter !== "all" && ` in ${categories.find(c => c.id === filter)?.name}`}
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default ProductSection;