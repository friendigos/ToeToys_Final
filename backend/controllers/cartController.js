const User = require('../models/User');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
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
  const { itemId } = req.params;
  const { quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const cartItem = user.cart.id(itemId);

    if (!cartItem) {
      return res.status(404).json({ msg: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
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
    user.cart = user.cart.filter(item => item._id.toString() !== itemId);
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error('Remove from Cart Error:', error.message);
    res.status(500).send('Server error');
  }
};