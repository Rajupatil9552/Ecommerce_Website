import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Helper function to get token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Get all orders (Admin)
export const getAllOrders = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${backendURL}/api/order/all-orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

// Get order history (User)
export const getOrderHistory = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${backendURL}/api/order/order-history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

// Place order
export const placeOrder = async (orderData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${backendURL}/api/order/place-order`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (orderId) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${backendURL}/api/order/cancel-order`, 
      { orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId, status) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${backendURL}/api/order/update-order-status`, 
      { orderId, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};