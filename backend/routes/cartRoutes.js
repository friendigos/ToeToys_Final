// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { addToCart, getCart, updateCartItem, removeFromCart } = require('../controllers/cartController');

// Protect all cart routes
router.use(protect);

// Add to Cart
router.post('/', addToCart);

// Get Cart Items
router.get('/', getCart);

// Update Cart Item
router.put('/:itemId', updateCartItem);

// Remove from Cart
router.delete('/:itemId', removeFromCart);

module.exports = router;
