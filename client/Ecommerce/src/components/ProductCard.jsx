import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../api/cartApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { ShoppingCartIcon, EyeIcon, StarIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart(product._id, 1);
      toast.success("Added to cart 🎉");
      setTimeout(() => navigate("/cart"), 900);
    } catch (error) {
      toast.error("Failed to add item ❌");
      console.error("Cart error:", error);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleViewDetails}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
    >
      {/* Quick View Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
        <motion.button
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewDetails}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2"
        >
          <EyeIcon className="w-5 h-5" />
          Quick View
        </motion.button>
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden h-64 bg-gray-50">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-full object-contain p-4"
        />
        
        {/* Discount Badge (if any) */}
        {product.discount && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-cta to-pink-600 text-white text-xs font-bold rounded-full">
            -{product.discount}%
          </div>
        )}
        
        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold">{product.rating || "4.5"}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <div className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
          {product.category || "Category"}
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
          {product.productName}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="text-2xl font-bold text-primary">₹{product.price}</div>
            {product.originalPrice && (
              <div className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </div>
            )}
          </div>
          
          {/* Stock Status */}
          <div className={`text-xs px-3 py-1 rounded-full ${
            product.stock > 0 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleViewDetails}
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <EyeIcon className="w-4 h-4" />
            Details
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 ${
              product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ShoppingCartIcon className="w-4 h-4" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-2xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;