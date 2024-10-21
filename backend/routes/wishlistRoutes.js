// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');

// Protect all wishlist routes
router.use(protect);

// Add to Wishlist
router.post('/', addToWishlist);

// Get Wishlist Items
router.get('/', getWishlist);

// Remove from Wishlist
router.delete('/:productId', removeFromWishlist);

module.exports = router;
