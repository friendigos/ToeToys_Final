// controllers/wishlistController.js
const User = require('../models/User');
const Product = require('../models/Product');

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ msg: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    console.error('Add to Wishlist Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    console.error('Get Wishlist Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findById(req.user.id);

    if (!user.wishlist.includes(productId)) {
      return res.status(404).json({ msg: 'Product not in wishlist' });
    }

    user.wishlist = user.wishlist.filter(item => item.toString() !== productId);
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    console.error('Remove from Wishlist Error:', error.message);
    res.status(500).send('Server error');
  }
};
