// controllers/productController.js
const Product = require('../models/Product');

// Create Product (Admin Only)
exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create Product Error:', error.message);
    res.status(500).send('Server error');
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get Products Error:', error.message);
    res.status(500).send('Server error');
  }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Get Product Error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
};

// Update Product (Admin Only)
exports.updateProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;
  const updatedFields = { name, description, price, category, stock, images };

  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    console.error('Update Product Error:', error.message);
    res.status(500).send('Server error');
  }
};

// Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Product removed' });
  } catch (error) {
    console.error('Delete Product Error:', error.message);
    res.status(500).send('Server error');
  }
};
