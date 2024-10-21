// controllers/cartController.js
const User = require('../models/User');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const user = await User.findById(req.user.id);

    const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Update quantity
      user.cart[itemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error('Add to Cart Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');
    res.json(user.cart);
  } catch (error) {
    console.error('Get Cart Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;
  try {
    const user = await User.findById(req.user.id);

    const item = user.cart.id(itemId);
    if (!item) return res.status(404).json({ msg: 'Cart item not found' });

    item.quantity = quantity;
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error('Update Cart Item Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    const item = user.cart.id(itemId);
    if (!item) return res.status(404).json({ msg: 'Cart item not found' });

    item.remove();
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error('Remove from Cart Error:', error.message);
    res.status(500).send('Server error');
  }
};
