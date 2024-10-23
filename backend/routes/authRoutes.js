// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
  register, 
  login, 
  requestOTP, 
  verifyOTP, 
  forgotPassword, 
  resetPassword,
  requestEmailOTP,
  verifyEmailOTP
} = require('../controllers/authController');

// Registration and Login
router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // Generate JWT and redirect to frontend with token
  const token = require('../utils/generateToken')(req.user);
  res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
});

// Phone Authentication
router.post('/phone/request-otp', requestOTP);
router.post('/phone/verify-otp', verifyOTP);

router.post('/email/request-otp', requestEmailOTP);
router.post('/email/verify-otp', verifyEmailOTP);

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
