import React, { useState, useEffect } from "react";
import { getCartItems, removeFromCart } from "../api/cartApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await getCartItems();
      console.log("Cart API Response:", response); // Debug log
      
      // Handle different response structures
      let items = [];
      if (response.data) {
        if (response.data.products) {
          items = response.data.products;
        } else if (response.data.items) {
          items = response.data.items;
        } else if (Array.isArray(response.data)) {
          items = response.data;
        }
      }
      
      console.log("Processed cart items:", items); // Debug log
      setCartItems(items);
      
      if (items.length === 0) {
        console.log("Cart is empty"); // Debug log
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId, productName) => {
    try {
      await removeFromCart(productId);
      setCartItems((prev) =>
        prev.filter((item) => item.productId?._id !== productId)
      );
      toast.success(`"${productName}" removed from cart`);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = () => {
  console.log("Checkout clicked. Cart items:", cartItems);
  console.log("Cart items length:", cartItems.length);
  
  // TEMPORARY: Comment out the cart check for testing
  // if (cartItems.length === 0) {
  //   toast.error("Your cart is empty");
  //   console.log("Cart is empty, preventing navigation");
  //   return;
  // }
  
  console.log("Navigating to /place-order");
  toast.success("Redirecting to checkout");
  
  // Navigate immediately
  navigate("/place-order");
};

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleClearCart = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is already empty");
      return;
    }

    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      try {
        // Remove items one by one (since we don't have clear all endpoint)
        for (const item of cartItems) {
          await removeFromCart(item.productId?._id);
        }
        setCartItems([]);
        toast.success("Cart cleared successfully");
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart");
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <div className="text-xl text-gray-600">Loading your cart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-primary hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {/* Cart Items */}
              {cartItems.map((item) => {
                const productId = item.productId?._id || item._id;
                const productName = item.productId?.productName || item.name || "Unknown Product";
                const price = item.productId?.price || item.price || 0;
                const imageUrl = item.productId?.imageUrl || item.imageUrl || "";
                const category = item.productId?.category || item.category || "";
                const stock = item.productId?.stock || item.stock || 'Yes';
                const quantity = item.quantity || 1;

                return (
                  <div
                    key={productId}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/96x96?text=No+Image";
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <h3 
                              className="font-semibold text-gray-900 text-lg mb-1 hover:text-primary cursor-pointer"
                              onClick={() => navigate(`/product/${productId}`)}
                            >
                              {productName}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Category: {category}
                            </p>
                            <p className="text-sm text-gray-500">
                              In Stock: {stock}
                            </p>
                          </div>

                          <div className="flex flex-col items-end">
                            {/* Price */}
                            <p className="text-xl font-bold text-gray-900 mb-2">
                              ₹{(price * quantity).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              ₹{price.toLocaleString()} × {quantity}
                            </p>
                          </div>
                        </div>

                        {/* Quantity and Remove Button */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-700">Quantity:</span>
                            <span className="font-medium bg-gray-100 px-3 py-1 rounded">
                              {quantity}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveFromCart(productId, productName)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Continue Shopping and Clear Cart Buttons */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={handleContinueShopping}
                    className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Continue Shopping
                  </button>
                  
                  <button
                    onClick={handleClearCart}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Clear Entire Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (GST 18%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-cta hover:bg-[#e00062] text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <div className="text-xs text-gray-500 text-center space-y-1">
                    <p className="flex items-center justify-center gap-1">
                      <span>✅</span> Secure checkout
                    </p>
                    <p className="flex items-center justify-center gap-1">
                      <span>✅</span> 7-day return policy
                    </p>
                    <p className="flex items-center justify-center gap-1">
                      <span>✅</span> Cash on delivery available
                    </p>
                  </div>
                </div>

                {/* Promo Code (Optional) */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Have a promo code?</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ShoppingCart;