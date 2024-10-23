const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const { sendOrderStatusEmail } = require('../utils/sendEmail');

// Helper function to calculate total revenue
const calculateRevenue = (orders) => {
  return orders.reduce((total, order) => total + order.totalAmount, 0);
};

exports.getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.setHours(0,0,0,0));
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const monthStart = new Date(now.setDate(1));

    const dailyOrders = await Order.find({ createdAt: { $gte: todayStart } });
    const weeklyOrders = await Order.find({ createdAt: { $gte: weekStart } });
    const monthlyOrders = await Order.find({ createdAt: { $gte: monthStart } });

    const stats = {
      daily: {
        orders: dailyOrders.length,
        revenue: calculateRevenue(dailyOrders)
      },
      weekly: {
        orders: weeklyOrders.length,
        revenue: calculateRevenue(weeklyOrders)
      },
      monthly: {
        orders: monthlyOrders.length,
        revenue: calculateRevenue(monthlyOrders)
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Get Dashboard Stats Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ orderStatus: 'Processing' })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(pendingOrders);
  } catch (error) {
    console.error('Get Pending Orders Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.acceptOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId).populate('user', 'email');
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    if (order.orderStatus !== 'Processing') {
      return res.status(400).json({ msg: 'Order is not in processing state' });
    }

    order.orderStatus = 'Accepted';
    await order.save();

    // Send email to user
    await sendOrderStatusEmail(order.user.email, order._id, 'Accepted');

    res.json({ msg: 'Order accepted and user notified', order });
  } catch (error) {
    console.error('Accept Order Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get All Orders Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(orderId).populate('user', 'email');
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.orderStatus = status;
    await order.save();

    // Send email to user
    await sendOrderStatusEmail(order.user.email, order._id, status);

    res.json({ msg: 'Order status updated and user notified', order });
  } catch (error) {
    console.error('Update Order Status Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.getProductInventory = async (req, res) => {
  try {
    const products = await Product.find().select('name stock');
    res.json(products);
  } catch (error) {
    console.error('Get Product Inventory Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.updateProductStock = async (req, res) => {
  const { productId } = req.params;
  const { stock } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.stock = stock;
    await product.save();

    res.json({ msg: 'Product stock updated', product });
  } catch (error) {
    console.error('Update Product Stock Error:', error.message);
    res.status(500).send('Server error');
  }
};
