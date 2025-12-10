import React, { useState, useEffect } from 'react'
import { getAllOrders } from '../../api/ordersApi.js';
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { 
  ShoppingBagIcon, 
  CalendarIcon, 
  CurrencyRupeeIcon,
  UserIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

const OrderListing = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Orders', color: 'bg-gray-100 text-gray-700' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-700' },
    { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-700' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-700' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  ];

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const response = await getAllOrders();
        console.log("Orders API Response:", response);
        
        // Handle different possible response structures
        let ordersData = [];
        
        if (Array.isArray(response.data)) {
          ordersData = response.data;
        } else if (Array.isArray(response)) {
          ordersData = response;
        } else if (response.data && Array.isArray(response.data.orders)) {
          ordersData = response.data.orders;
        } else if (Array.isArray(response.orders)) {
          ordersData = response.orders;
        } else if (response.data && typeof response.data === 'object') {
          // Convert object to array if needed
          ordersData = Object.values(response.data);
        }
        
        console.log("Processed orders data:", ordersData);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setFilteredOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
        setFilteredOrders([]);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  // Filter orders based on search and status
  useEffect(() => {
    let filtered = Array.isArray(orders) ? orders : [];
    
    if (searchTerm) {
      filtered = filtered.filter(order =>
        (order.orderId && order.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.userId && order.userId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.orderStatus === selectedStatus);
    }
    
    setFilteredOrders(filtered);
  }, [searchTerm, selectedStatus, orders]);

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

  // Calculate total revenue safely
  const calculateTotalRevenue = () => {
    if (!Array.isArray(orders)) return 0;
    return orders.reduce((total, order) => {
      const amount = parseFloat(order.totalAmount) || 0;
      return total + amount;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
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
                <span className="text-sm font-semibold text-primary">Order Management</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Order <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-gray-600 max-w-3xl">
                Monitor and manage all customer orders from a single dashboard
              </p>
            </div>

            {/* Stats - Fixed revenue calculation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">
                  {Array.isArray(orders) ? orders.length : 0}
                </div>
                <div className="text-sm text-gray-500">Total Orders</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-primary">
                  ₹{calculateTotalRevenue().toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-500">Revenue</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Order ID or User ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-64">
                <div className="relative">
                  <FunnelIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders Grid */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {filteredOrders.map((order, index) => {
              // Ensure order has required properties
              const orderId = order.orderId || order._id || `ORDER-${index + 1}`;
              const status = order.orderStatus || 'pending';
              const totalAmount = parseFloat(order.totalAmount) || 0;
              const userId = order.userId || 'N/A';
              
              return (
                <motion.div
                  key={order._id || index}
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
                          <div className="flex items-center gap-3">
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
                          <p className="text-sm text-gray-500 mt-1">
                            <CalendarIcon className="w-4 h-4 inline mr-1" />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-xl font-bold text-primary">
                            <CurrencyRupeeIcon className="w-5 h-5" />
                            {totalAmount.toLocaleString('en-IN')}
                          </div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">
                            {calculateTotalItems(order)}
                          </div>
                          <p className="text-sm text-gray-500">Items</p>
                        </div>
                        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedOrder === orderId ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </div>
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
                        {/* Customer Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              <UserIcon className="w-5 h-5" />
                              Customer Details
                            </h4>
                            <div className="bg-gray-50 rounded-xl p-4">
                              <p className="text-sm text-gray-600">User ID: {userId}</p>
                              <p className="text-sm text-gray-600 mt-2">Email: {order.userEmail || 'N/A'}</p>
                              <p className="text-sm text-gray-600 mt-2">Phone: {order.userPhone || 'N/A'}</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              <TruckIcon className="w-5 h-5" />
                              Shipping Details
                            </h4>
                            <div className="bg-gray-50 rounded-xl p-4">
                              <p className="text-sm text-gray-600">Address: {order.shippingAddress || 'N/A'}</p>
                              <p className="text-sm text-gray-600 mt-2">Payment: {order.paymentMethod || 'N/A'}</p>
                              <p className="text-sm text-gray-600 mt-2">Payment Status: 
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                  order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {(order.paymentStatus || 'pending').toUpperCase()}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Order Items - Only if items exist */}
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
                                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
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

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          {status !== 'delivered' && status !== 'cancelled' && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                              >
                                Update Status
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2.5 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition-colors"
                              >
                                Mark as Delivered
                              </motion.button>
                            </>
                          )}
                          {status !== 'cancelled' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-5 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
                            >
                              Cancel Order
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                          >
                            View Invoice
                          </motion.button>
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
              {searchTerm ? `No orders found for "${searchTerm}"` : 'No orders available yet'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default OrderListing