// controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  const { paymentMethod, shippingAddress } = req.body; // paymentMethod could be 'razorpay', etc.
  try {
    const user = await User.findById(req.user.id).populate('cart.product');

    if (user.cart.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = user.cart.map(item => {
      totalAmount += item.product.price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    // Create order
    const order = new Order({
      user: user._id,
      items: orderItems,
      totalAmount,
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
      shippingAddress,
    });

    await order.save();

    // Clear user's cart
    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Create Order Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get User Orders Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get All Orders Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.orderStatus = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Update Order Status Error:', error.message);
    res.status(500).send('Server error');
  }
};
