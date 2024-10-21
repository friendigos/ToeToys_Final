// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/sendOTP');
const { generateOTP } = require('../utils/generateOTP');

// In-memory store for OTPs (Use Redis or a database in production)
const otpStore = {};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user
    user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.requestOTP = async (req, res) => {
  const { phone } = req.body;
  try {
    // Validate phone number (basic validation)
    if (!phone || phone.length < 10) {
      return res.status(400).json({ msg: 'Invalid phone number' });
    }

    // Generate OTP
    const otp = generateOTP();


    // Store OTP with expiration (e.g., 10 minutes)
    otpStore[phone] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

    res.json({ msg: 'OTP sent successfully' });
  } catch (error) {
    console.error('Request OTP Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    // Check if OTP exists for the phone
    const record = otpStore[phone];
    if (!record) return res.status(400).json({ msg: 'OTP not requested' });

    // Check if OTP is expired
    if (Date.now() > record.expiresAt) {
      delete otpStore[phone];
      return res.status(400).json({ msg: 'OTP expired' });
    }

    // Check if OTP matches
    if (record.otp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });

    // OTP is valid, delete it
    delete otpStore[phone];

    // Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Verify OTP Error:', error.message);
    res.status(500).send('Server error');
  }
};
