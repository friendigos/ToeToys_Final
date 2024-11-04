// models/Product.js
const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
    color: String,
    colorCode: String,
    colorImage: String,
    image: String
});

const productSchema = new mongoose.Schema({
    id: String,
    category: String,
    type: String,
    name: String,
    gender: String,
    new: Boolean,
    sale: Boolean,
    rate: Number,
    price: Number,
    originPrice: Number,
    brand: String,
    sold: Number,
    quantity: Number,
    quantityPurchase: Number,
    sizes: [String],
    variation: [variationSchema],
    thumbImage: [String],
    images: [String],
    description: String,
    action: String,
    slug: String
});

module.exports = mongoose.model('Product', productSchema);