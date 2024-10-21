// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

// Protect all order routes
router.use(protect);

// Create Order
router.post('/', createOrder);

// Get User's Orders
router.get('/', getUserOrders);

// Admin Routes
router.get('/all', admin, getAllOrders);
router.put('/:orderId/status', admin, updateOrderStatus);

module.exports = router;
