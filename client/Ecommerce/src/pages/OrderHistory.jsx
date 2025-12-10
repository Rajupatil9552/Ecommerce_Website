import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderHistory, cancelOrder } from '../api/ordersApi.js';
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  ShoppingBagIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  EyeIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const statusOptions = [
    { value: "all", label: "All Orders", color: "bg-gray-100 text-gray-700" },
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-700" },
    { value: "processing", label: "Processing", color: "bg-blue-100 text-blue-700" },
    { value: "shipped", label: "Shipped", color: "bg-purple-100 text-purple-700" },
    { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-700" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-700" },
  ];

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.orderStatus === selectedFilter));
    }
  }, [selectedFilter, orders]);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await getOrderHistory();
      const ordersData = response.data || [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setFilteredOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.error("Error fetching order history:", error);
      toast.error("Failed to load order history");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return <ClockIcon className="w-5 h-5" />;
    
    switch(status.toLowerCase()) {
      case 'pending': return <ClockIcon className="w-5 h-5" />;
      case 'processing': return <TruckIcon className="w-5 h-5" />;
      case 'shipped': return <TruckIcon className="w-5 h-5" />;
      case 'delivered': return <CheckCircleIcon className="w-5 h-5" />;
      case 'cancelled': return <XCircleIcon className="w-5 h-5" />;
      default: return <ClockIcon className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Invalid Date';
  }
};


  const calculateTotalItems = (order) => {
    if (!order || !order.items || !Array.isArray(order.items)) return 0;
    return order.items.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setCancellingOrder(orderId);
      await cancelOrder(orderId);
      toast.success("Order cancelled successfully");
      
      // Refresh orders
      await fetchOrderHistory();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancellingOrder(null);
    }
  };

  const handleReorder = (_order) => {
    toast.success("Items added to cart for reorder!");
    // Implement adding to cart logic here if needed
  };

  const handleTrackOrder = (orderId) => {
    toast.success(`Tracking order #${orderId.slice(-8)}`);
  };

  const getStatusProgress = (status) => {
    const statusSteps = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = statusSteps.indexOf(status.toLowerCase());
    return currentIndex >= 0 ? ((currentIndex + 1) / statusSteps.length) * 100 : 0;
  };

  const getStatusSteps = () => [
    { key: "pending", label: "Order Placed", icon: ClockIcon },
    { key: "processing", label: "Processing", icon: ArrowPathIcon },
    { key: "shipped", label: "Shipped", icon: TruckIcon },
    { key: "delivered", label: "Delivered", icon: CheckCircleIcon },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
                <ShoppingBagIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Order History</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Orders</span>
              </h1>
              <p className="text-gray-600 max-w-3xl">
                Track and manage all your past and current orders in one place
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                <div className="text-sm text-gray-500">Total Orders</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-primary">
                  ₹{orders.reduce((total, order) => total + (order.totalAmount || 0), 0).toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-500">Total Spent</div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {statusOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  selectedFilter === option.value
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  {getStatusIcon(option.value)}
                  {option.label}
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/30">
                    {option.value === "all" 
                      ? orders.length 
                      : orders.filter(o => o.orderStatus === option.value).length
                    }
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {filteredOrders.map((order, index) => {
              const orderId = order._id || order.orderId || `ORDER-${index + 1}`;
              const status = order.orderStatus || 'pending';
              const canCancel = !['delivered', 'cancelled', 'shipped'].includes(status);
              
              return (
                <motion.div
                  key={orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  {/* Order Header */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedOrder(expandedOrder === orderId ? null : orderId)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                          <ShoppingBagIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                              Order #{orderId.toString().slice(-8)}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                              statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-700'
                            }`}>
                              {getStatusIcon(status)}
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {formatDate(order.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingBagIcon className="w-4 h-4" />
                              {calculateTotalItems(order)} items
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-xl font-bold text-primary">
                            <CurrencyRupeeIcon className="w-5 h-5" />
                            {(order.totalAmount || 0).toLocaleString('en-IN')}
                          </div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                        </div>
                        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedOrder === orderId ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </div>

                    {/* Status Progress Bar */}
                    {!['cancelled', 'delivered'].includes(status) && (
                      <div className="mt-6">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>Order Status</span>
                          <span>{getStatusProgress(status)}% Complete</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getStatusProgress(status)}%` }}
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          {getStatusSteps().map((step, idx) => (
                            <div key={step.key} className="text-center">
                              <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center ${
                                getStatusSteps().findIndex(s => s.key === status) >= idx
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-200 text-gray-500'
                              }`}>
                                <step.icon className="w-3 h-3" />
                              </div>
                              <span className="text-xs text-gray-600">{step.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === orderId && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-6 space-y-6">
                        {/* Shipping & Payment Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Shipping Details</h4>
                            <div className="bg-gray-50 rounded-xl p-4">
                              {order.shippingAddress ? (
                                <>
                                  <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                                  <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
                                  <p className="text-sm text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}</p>
                                  <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
                                </>
                              ) : (
                                <p className="text-gray-500">No shipping address provided</p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Payment Details</h4>
                            <div className="bg-gray-50 rounded-xl p-4">
                              <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Payment Method:</span>
                                <span className="font-medium capitalize">{order.paymentMethod || 'Cash on Delivery'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Payment Status:</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  order.paymentStatus === 'paid' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {(order.paymentStatus || 'pending').toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        {order.items && Array.isArray(order.items) && order.items.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Order Items</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Product</th>
                                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Price</th>
                                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Quantity</th>
                                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Total</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {order.items.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                      <td className="p-3">
                                        <div className="flex items-center gap-3">
                                          {item.image && (
                                            <img 
                                              src={item.image} 
                                              alt={item.name} 
                                              className="w-12 h-12 rounded-lg object-cover"
                                            />
                                          )}
                                          <div>
                                            <p className="font-medium text-gray-900">{item.name || 'Product'}</p>
                                            <p className="text-sm text-gray-500">{item.category || 'N/A'}</p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-3">₹{(item.price || 0).toLocaleString('en-IN')}</td>
                                      <td className="p-3">{item.quantity || 1}</td>
                                      <td className="p-3 font-semibold">
                                        ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Order Totals */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <div className="space-y-3 max-w-md ml-auto">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="font-medium">₹{(order.subtotal || 0).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Shipping</span>
                              <span className="font-medium">
                                {order.shippingCost === 0 ? "FREE" : `₹${order.shippingCost}`}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tax</span>
                              <span className="font-medium">₹{(order.tax || 0).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-300 pt-3">
                              <span className="text-lg font-bold text-gray-900">Total</span>
                              <span className="text-2xl font-bold text-primary">
                                ₹{(order.totalAmount || 0).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          {canCancel && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCancelOrder(orderId)}
                              disabled={cancellingOrder === orderId}
                              className="px-5 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              {cancellingOrder === orderId ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                                  Cancelling...
                                </>
                              ) : (
                                <>
                                  <XMarkIcon className="w-4 h-4" />
                                  Cancel Order
                                </>
                              )}
                            </motion.button>
                          )}
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReorder(order)}
                            className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                          >
                            <ArrowPathIcon className="w-4 h-4" />
                            Reorder
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTrackOrder(orderId)}
                            className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                          >
                            <EyeIcon className="w-4 h-4" />
                            Track Order
                          </motion.button>
                          
                          <button
                            onClick={() => navigate(`/invoice/${orderId}`)}
                            className="px-5 py-2.5 text-primary hover:text-primary/80 font-semibold"
                          >
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {selectedFilter === "all" 
                ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                : `No ${selectedFilter} orders found`
              }
            </p>
            {selectedFilter !== "all" && (
              <button
                onClick={() => setSelectedFilter("all")}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all mb-4"
              >
                View All Orders
              </button>
            )}
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Start Shopping
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;