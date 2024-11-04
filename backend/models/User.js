// models/User.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: String,
    quantity: Number,
    selectedSize: String,
    selectedColor: String,
    price: Number,
    name: String,
    image: String,
    brand: String
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple docs with null
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  cart: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);
