const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { getDashboardStats, getPendingOrders, acceptOrder } = require('../controllers/adminController');
const { param, validationResult } = require('express-validator');

// Protect all admin routes
router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/orders/pending', getPendingOrders);

const validateOrderId = [
  param('orderId').isMongoId().withMessage('Invalid order ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.put('/orders/:orderId/accept', validateOrderId, acceptOrder);

module.exports = router;
