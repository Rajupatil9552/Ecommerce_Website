

import axios from 'axios';


const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log("Backend URL in fetchProduct.js:", backendURL);
const token = localStorage.getItem('token');
console.log("Token in cartApi.js:", token);

const addToCart = async (productId, quantity) => {
    try{
        const response = await axios.post(`${backendURL}/api/cart/add`, {
            productId,
            quantity
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    catch(error){
        console.error("Error adding product to cart:", error);
        throw error;
    }
}

const getCartItems = async () => {
    try{
        const response = await axios.get(`${backendURL}/api/cart/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    catch(error){
        console.error("Error fetching cart items:", error);
        throw error;
    }
}


const removeFromCart = async (productId) => {
    try{
        const response = await axios.post(`${backendURL}/api/cart/remove`, {
            productId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    catch(error){
        console.error("Error removing product from cart:", error);
        throw error;
    }
}


export {
    addToCart,
    getCartItems,
    removeFromCart
}