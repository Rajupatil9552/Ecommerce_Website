import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/fetchProduct";
import SimilarProducts from "../components/SimilarProduct.jsx";
import { addToCart } from "../api/cartApi.js";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const getProductById = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProductById(id);
        
        if (!response.data) {
          setError("Product not found");
          toast.error("Product not found ❌");
        } else {
          setProductDetails(response.data);
          // Set the main image
          if (response.data.images && response.data.images.length > 0) {
            setSelectedImage(response.data.images[0]);
          } else if (response.data.imageUrl) {
            setSelectedImage(response.data.imageUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product");
        toast.error("Failed to load product ❌");
      } finally {
        setLoading(false);
      }
    };
    
    getProductById();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1) {
      setQuantity(1);
    } else if (value > (productDetails?.maxQuantity || 10)) {
      setQuantity(productDetails?.maxQuantity || 10);
      toast.info(`Maximum quantity is ${productDetails?.maxQuantity || 10}`);
    } else if (value > (productDetails?.stock || 10)) {
      setQuantity(productDetails?.stock);
      toast.info(`Only ${productDetails?.stock} items available`);
    } else {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!productDetails) return;
    
    try {
      setAddingToCart(true);
      await addToCart(productDetails._id, quantity);
      toast.success("Product added to cart 🎉");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Unable to add to cart ❌");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!productDetails) return;
    
    try {
      setAddingToCart(true);
      // Add to cart first
      await addToCart(productDetails._id, quantity);
      // Then navigate to checkout
      navigate('/checkout');
      toast.success("Product added to cart! Redirecting to checkout 🎉");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Unable to proceed to checkout ❌");
    } finally {
      setAddingToCart(false);
    }
  };

  const incrementQuantity = () => {
    const maxQty = Math.min(productDetails?.maxQuantity || 10, productDetails?.stock || 10);
    if (quantity < maxQty) {
      setQuantity(prev => prev + 1);
    } else {
      toast.info(`Maximum quantity is ${maxQty}`);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <div className="text-xl text-gray-600">Loading product details...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center py-16">
          <div className="text-5xl mb-4">😞</div>
          <div className="text-2xl text-red-600 mb-4">{error}</div>
          <p className="text-gray-600 mb-8">The product you're looking for might not exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium text-lg transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!productDetails) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center py-16">
          <div className="text-5xl mb-4">❓</div>
          <div className="text-2xl text-gray-700 mb-4">Product Not Found</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium text-lg transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = productDetails.stock <= 0;
  const maxQuantity = Math.min(productDetails.maxQuantity || 10, productDetails.stock || 10);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <button 
                onClick={() => navigate('/')}
                className="hover:text-primary"
              >
                Home
              </button>
            </li>
            <li>/</li>
            <li>
              <button 
                onClick={() => navigate('/products')}
                className="hover:text-primary"
              >
                Products
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{productDetails.category}</li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-[200px]">{productDetails.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg flex justify-center items-center min-h-[400px]">
              <img
                src={selectedImage || productDetails.imageUrl}
                alt={productDetails.name}
                className="max-h-[380px] w-auto object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            </div>

            {/* Image Gallery */}
            {(productDetails.images && productDetails.images.length > 1) && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productDetails.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === img ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${productDetails.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80x80?text=Image";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg">🚚</div>
                <div className="text-xs font-medium mt-1">Free Delivery</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg">🔄</div>
                <div className="text-xs font-medium mt-1">7-Day Returns</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg">🔒</div>
                <div className="text-xs font-medium mt-1">Secure Payment</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg">⭐</div>
                <div className="text-xs font-medium mt-1">1 Year Warranty</div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {productDetails.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {productDetails.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-primary">
                ₹{productDetails.price.toLocaleString()}
              </p>
              {productDetails.originalPrice && (
                <>
                  <p className="text-xl text-gray-500 line-through">
                    ₹{productDetails.originalPrice.toLocaleString()}
                  </p>
                  <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                    Save {Math.round((1 - productDetails.price / productDetails.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                productDetails.stock > 10 ? 'bg-green-500' : 
                productDetails.stock > 0 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}></div>
              <p className={`text-base font-medium ${
                productDetails.stock > 10 ? 'text-green-600' : 
                productDetails.stock > 0 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {productDetails.stock > 10 
                  ? 'In Stock' 
                  : productDetails.stock > 0 
                    ? `Only ${productDetails.stock} left!` 
                    : 'Out of Stock'}
              </p>
              {productDetails.soldCount > 0 && (
                <span className="text-gray-500 text-sm">
                  • {productDetails.soldCount.toLocaleString()} sold
                </span>
              )}
            </div>

            {/* Description */}
            <div className="pt-2">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {productDetails.description}
              </p>
            </div>

            {/* Features */}
            {productDetails.features && productDetails.features.length > 0 && (
              <div className="pt-2">
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {productDetails.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {productDetails.specifications && (
              <div className="pt-2">
                <h3 className="text-lg font-semibold mb-2">Specifications:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(productDetails.specifications).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-medium text-gray-700 w-1/2">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-4">
              <div className="flex items-center gap-4">
                <label className="text-lg font-medium">Quantity:</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isOutOfStock}
                    className={`px-4 py-2 text-lg ${
                      quantity <= 1 || isOutOfStock
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={maxQuantity}
                    value={quantity}
                    disabled={isOutOfStock}
                    className="w-16 text-center border-x py-2 focus:outline-none"
                    onChange={handleQuantityChange}
                  />
                  <button 
                    onClick={incrementQuantity}
                    disabled={quantity >= maxQuantity || isOutOfStock}
                    className={`px-4 py-2 text-lg ${
                      quantity >= maxQuantity || isOutOfStock
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Max: {maxQuantity} per order
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || addingToCart}
                className={`flex-1 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-gray-300 cursor-not-allowed'
                    : addingToCart
                    ? 'bg-cta/80 cursor-wait'
                    : 'bg-cta hover:bg-[#e00062] hover:shadow-lg'
                } text-white`}
              >
                {addingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : isOutOfStock ? (
                  'Out of Stock'
                ) : (
                  '🛒 Add to Cart'
                )}
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || addingToCart}
                className={`flex-1 px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                  isOutOfStock
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-primary hover:bg-blue-700 hover:shadow-lg text-white'
                }`}
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Cash on Delivery available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Easy returns within 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Genuine product with warranty</span>
                </div>
              </div>
            </div>

            {/* Share and Wishlist */}
            <div className="flex gap-4 pt-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-primary">
                <span className="text-xl">❤️</span>
                <span>Add to Wishlist</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-primary">
                <span className="text-xl">📤</span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rating & Reviews Section */}
        {productDetails.rating && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold">{productDetails.rating}</div>
              <div className="text-yellow-400 text-2xl">
                {'★'.repeat(Math.floor(productDetails.rating))}
                {'☆'.repeat(5 - Math.floor(productDetails.rating))}
              </div>
              <div className="text-gray-600">
                ({productDetails.reviewCount || 0} reviews)
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Similar Products */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">You May Also Like</h2>
          <SimilarProducts
            productDetails={productDetails}
            currentProductId={id}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;