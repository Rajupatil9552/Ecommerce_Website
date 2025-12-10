import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api/fetchProduct.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

const SimilarProducts = ({ productDetails, currentProductId }) => {
  const category = productDetails?.category || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products inside SimilarProducts:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const similarProducts = products.filter(
    (product) => product.category === category && product._id !== currentProductId
  ).slice(0, 4); // Show only 4 similar products

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-3">
              <SparklesIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">You might also like</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Similar <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Explore more items from the <span className="font-semibold text-primary">{category}</span> category
            </p>
          </div>
          
          {similarProducts.length > 0 && (
            <Link 
              to={`/products?category=${category}`}
              className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold hover:from-gray-200 hover:to-gray-300 transition-all group"
            >
              View All
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-56 mb-4"></div>
              <div className="h-5 bg-gray-200 rounded mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : similarProducts.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {similarProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={`/product/${product._id}`}>
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-gray-50">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={product.imageUrl}
                      alt={product.productName}
                      className="w-full h-full object-contain p-4"
                    />
                    
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="w-full py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        Quick View
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-3">
                    {/* Category */}
                    <div className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {product.category}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.productName}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-2xl font-bold text-primary">₹{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </div>
                      )}
                    </div>

                    {/* View Button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                    >
                      View Details
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-300 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* No Similar Products State */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <SparklesIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Similar Products</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We couldn't find other products in the same category. Check out our other collections!
          </p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Browse All Products
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      )}

      {/* Mobile View All Button */}
      {!loading && similarProducts.length > 0 && (
        <div className="mt-10 text-center sm:hidden">
          <Link 
            to={`/products?category=${category}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all"
          >
            View All Similar Products
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default SimilarProducts;