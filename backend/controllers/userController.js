const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get Profile Error:', error.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Update Profile Error:', error.message);
    res.status(500).send('Server error');
  }
};
