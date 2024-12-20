// // controllers/productController.js
// const Product = require('../models/Product');

// // Create Product (Admin Only)
// exports.createProduct = async (req, res) => {
//   const { name, description, price, category, stock, images } = req.body;
//   try {
//     const product = new Product({
//       name,
//       description,
//       price,
//       category,
//       stock,
//       images,
//     });

//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     console.error('Create Product Error:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// // Get All Products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (error) {
//     console.error('Get Products Error:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// // Get Single Product by ID
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ msg: 'Product not found' });
//     res.json(product);
//   } catch (error) {
//     console.error('Get Product Error:', error.message);
//     if (error.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Product not found' });
//     }
//     res.status(500).send('Server error');
//   }
// };

// // Update Product (Admin Only)
// exports.updateProduct = async (req, res) => {
//   const { name, description, price, category, stock, images } = req.body;
//   const updatedFields = { name, description, price, category, stock, images };

//   try {
//     let product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ msg: 'Product not found' });

//     product = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: updatedFields },
//       { new: true }
//     );

//     res.json(product);
//   } catch (error) {
//     console.error('Update Product Error:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// // Delete Product (Admin Only)
// exports.deleteProduct = async (req, res) => {
//   try {
//     let product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ msg: 'Product not found' });

//     await Product.findByIdAndRemove(req.params.id);

//     res.json({ msg: 'Product removed' });
//   } catch (error) {
//     console.error('Delete Product Error:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.searchProducts = async (req, res) => {
//   const { keyword } = req.query;
//   try {
//     const products = await Product.find({
//       $or: [
//         { name: { $regex: keyword, $options: 'i' } },
//         { description: { $regex: keyword, $options: 'i' } }
//       ]
//     });
//     res.json(products);
//   } catch (error) {
//     console.error('Search Products Error:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.getProductsByCategory = async (req, res) => {
//   const { category } = req.params;
//   try {
//     const products = await Product.find({ category });
//     res.json(products);
//   } catch (error) {
//     console.error('Get Products by Category Error:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.addReview = async (req, res) => {
//   const { rating, comment } = req.body;
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ msg: 'Product not found' });
//     }

//     const alreadyReviewed = product.reviews.find(
//       r => r.user.toString() === req.user.id.toString()
//     );

//     if (alreadyReviewed) {
//       return res.status(400).json({ msg: 'Product already reviewed' });
//     }

//     const review = {
//       user: req.user.id,
//       rating: Number(rating),
//       comment
//     };

//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.avgRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

//     await product.save();
//     res.status(201).json({ msg: 'Review added' });
//   } catch (error) {
//     console.error('Add Review Error:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.getProductReviews = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
//     if (!product) {
//       return res.status(404).json({ msg: 'Product not found' });
//     }
//     res.json(product.reviews);
//   } catch (error) {
//     console.error('Get Product Reviews Error:', error.message);
//     res.status(500).send('Server error');
//   }
// };

// controllers/productController.js
const Product = require('../models/Product');

// Fetch all products
const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// Fetch product by ID
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
};

// Create a new product (admin only)
const createProduct = async (req, res) => {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
};

// Update product by ID (admin only)
const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
};

// Delete product by ID (admin only)
const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};

// Search products based on criteria
const searchProducts = async (req, res) => {
    const searchTerm = req.query.q;
    const products = await Product.find({ name: new RegExp(searchTerm, 'i') });
    res.json(products);
};

// Fetch products by category
const getProductsByCategory = async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
};

// Add a review to a product
const addReview = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.reviews.push(req.body);
        await product.save();
        res.status(201).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
    const product = await Product.findById(req.params.id).select('reviews');
    res.json(product.reviews);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,
    addReview,
    getProductReviews,
};
