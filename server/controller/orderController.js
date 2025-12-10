import { placeOrderService , getOrderHistoryService, cancelOrderService, updateOrderStatusService, getAllOrdersService } from "../service/orderService.js";
import { authenticateToken, authorizeRole } from '../middleware/middleware.js';

const placeOrder = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const order = await placeOrderService(req, res);
        res.status(201).json(order);
    }
    catch(error){
        res.send(   error.message);
    }
}

const getOrderHistory = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const orders = await getOrderHistoryService(req, res);
        res.json(orders);
    }
    catch(error){
        res.send(error.message);
    }
}

const getAllOrders = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const orders = await getAllOrdersService(req, res);
        res.json(orders);
    }
    catch(error){
        res.send(error.message);
    }
}

const cancelOrder = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const order = await cancelOrderService(req, res);
        res.json(order);
    }
    catch(error){
        res.send(error.message);
    }
}

const updateOrderStatus = async (req, res) => {
    try{
        //user authentication and authorization should be done in middleware
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }

        const authorized = await authorizeRole(['admin'], req);

        if (!authorized) {
            return res.send("User not authorized");
        }
        const order = await updateOrderStatusService(req, res);
        res.json(order);
    }
    catch(error){
        res.send(error.message);
    }
}

export{
    placeOrder,
    getOrderHistory,
    cancelOrder,
    updateOrderStatus,
    getAllOrders
}