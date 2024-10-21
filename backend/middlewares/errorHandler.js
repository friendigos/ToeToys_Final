// middlewares/errorHandler.js
exports.errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ msg: 'Server Error' });
  };
  