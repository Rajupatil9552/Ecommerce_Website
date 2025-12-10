
import Router from 'express';
import { placeOrder, getOrderHistory, cancelOrder, updateOrderStatus, getAllOrders } from '../controller/orderController.js'

const orderRouter = Router();

orderRouter.post('/place-order', placeOrder);

orderRouter.get('/order-history', getOrderHistory);

orderRouter.post('/cancel-order', cancelOrder);

orderRouter.post('/update-order-status', updateOrderStatus);

orderRouter.get('/all-orders', getAllOrders);



export default orderRouter;
