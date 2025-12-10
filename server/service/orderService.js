import OrderModel from '../model/orderModel.js';
import { getUserIdFromRequest } from '../helper/helper.js';
import productModel from '../model/productModel.js';
import cartModel from '../model/cartModel.js';
import User from '../model/userModel.js';

const getOrderHistoryService = async(req , res) =>{
    try{
        const userId = getUserIdFromRequest(req);
        const orders = await OrderModel.find({ userId: userId });
        if(orders.length === 0){
            return res.status(200).send("No orders found for user");
        }
        return orders;
    }
    catch(error){
        throw new Error(error.message);
    }
}


const getAllOrdersService = async(req , res) =>{
    try{
        const userId = getUserIdFromRequest(req);
        const orders = await OrderModel.find();
        if(orders.length === 0){
            return res.status(200).send("No orders found for user");
        }
        return orders;
    }
    catch(error){
        throw new Error(error.message);
    }
}



const placeOrderService = async(req , res) =>{
    try{
        const userId = getUserIdFromRequest(req);
        const { products, totalAmount } = req.body;

        console.log("Placing order for User ID:", userId);
        console.log("Order details:", { products, totalAmount });
        
        const newOrder = new OrderModel({
            userId: userId,
            products: products,
            totalAmount: totalAmount
        });

        //update cart - remove ordered items from cart && decrease product stock
        let cart = await cartModel.findOne({ userId: userId });
        if (cart) {
            cart.products = cart.products.filter(item => {
                return !products.some(orderedItem => orderedItem.productId === item.productId.toString());
            }); 
            await cart.save();
        }
        
        for (const productInOrder of products) {
            const product = await productModel.findById(productInOrder.productId);
            if (product) {
                if(product.stock > 0){
                    product.stock -= productInOrder.quantity;
                    await product.save();
                } else {
                    throw new Error(`Product with ID ${productInOrder.productId} is out of stock`);
                }
            }
        }

        await newOrder.save();
        //add this order to user's order history
        const user = await User.findById(userId);
        if(user){
            if(!user.orderHistory){
                user.orderHistory = [];
            }
            user.orderHistory.push(newOrder._id);
            await user.save();
        }
        return newOrder;
    }
    catch(error){
        throw new Error(error.message);
    }
}      


const cancelOrderService = async(req , res) =>{
    try{
        const userId = getUserIdFromRequest(req);
        const { orderId } = req.body;

        const order = await OrderModel.findOne({ _id: orderId, userId: userId });
        if (!order) {
            throw new Error('Order not found for user');
        }

        if(order.orderStatus === 'cancelled'){
            throw new Error('Order is already cancelled');
        }

        if(order.orderStatus === 'shipped' || order.orderStatus === 'delivered'){
            throw new Error('Order cannot be cancelled as it is already shipped or delivered');
        }

        order.orderStatus = 'cancelled';
        await order.save();
        return order;
    }
    catch(error){
        throw new Error(error.message);
    }
}



const updateOrderStatusService = async(req , res) =>{
    try{
        const { orderId, status } = req.body;

        const order = await OrderModel.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        order.orderStatus = status;
        await order.save();
        return order;
    }
    catch(error){
        throw new Error(error.message);
    }
}

export {
    placeOrderService,
    getOrderHistoryService, 
    cancelOrderService,
    updateOrderStatusService,
    getAllOrdersService
}