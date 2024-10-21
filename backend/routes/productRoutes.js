// routes/productRoutes.js
const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middlewares/authMiddleware');

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

// Routes accessible to all users
router.get('/', getProducts);
router.get('/:id', getProductById);

// Routes accessible only to authenticated admin users
// For simplicity, assuming any authenticated user is admin; implement role-based auth as needed
router.post('/', protect,admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
