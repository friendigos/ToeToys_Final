// controllers/paymentController.js
const razorpay = require('../config/razorpay');
const Order = require('../models/Order');
const crypto = require('crypto');

exports.createRazorpayOrder = async (req, res) => {
  const { orderId } = req.body; // The order ID from your orders collection
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    // Create Razorpay order
    const options = {
      amount: order.totalAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: `order_receipt_${order._id}`,
    };

    const razorOrder = await razorpay.orders.create(options);

    // Update order with Razorpay order ID
    order.razorpayOrderId = razorOrder.id;
    await order.save();

    res.json({ razorOrder });
  } catch (error) {
    console.error('Create Razorpay Order Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  try {
    // Verify signature
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: 'Invalid signature' });
    }

    // Find the order and update payment details
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.paymentStatus = 'Paid';
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    res.json({ msg: 'Payment verified successfully' });
  } catch (error) {
    console.error('Verify Payment Error:', error.message);
    res.status(500).send('Server error');
  }
};
