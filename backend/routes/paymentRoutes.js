// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { createRazorpayOrder, verifyPayment } = require('../controllers/paymentController');

// Protect all payment routes
router.use(protect);

// Create Razorpay Order
router.post('/razorpay/order', createRazorpayOrder);

// Verify Payment
router.post('/razorpay/verify', verifyPayment);

// Additional payment methods can be added similarly

module.exports = router;
