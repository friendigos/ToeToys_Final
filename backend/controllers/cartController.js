const User = require('../models/User');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    const { product, quantity = 1, selectedSize, selectedColor } = req.body;
    try {
        console.log('Received product data:', product);

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        let productExists = await Product.findOne({ id: product.id });
        
        console.log('Found product:', productExists);

        if (!productExists) {
            return res.status(404).json({ 
                msg: 'Product not found',
                debug: {
                    searchedId: product.id,
                    receivedProduct: product
                }
            });
        }

        if (!user.cart) {
            user.cart = [];
        }

        const cartItemIndex = user.cart.findIndex(
            item => item.productId === product.id && 
                   item.selectedSize === selectedSize && 
                   item.selectedColor === selectedColor
        );

        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            user.cart.push({
                productId: product.id,
                quantity,
                selectedSize,
                selectedColor,
                price: product.price,
                name: product.name,
                image: product.thumbImage[0],
                brand: product.brand
            });
        }

        await user.save();
        console.log('Updated cart:', user.cart);
        res.json(user.cart);
    } catch (error) {
        console.error('Add to Cart Error:', error);
        res.status(500).json({ 
            msg: 'Server error', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log('User in getCart:', user);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.json([]);
        }

        const cartWithProducts = await Promise.all(
            user.cart.map(async (item) => {
                const product = await Product.findOne({ id: item.productId });
                console.log('Found product for cart item:', product);
                if (!product) {
                    return null;
                }
                return {
                    ...item.toObject(),
                    product: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        brand: product.brand,
                        thumbImage: product.thumbImage,
                        variation: product.variation
                    }
                };
            })
        );

        const validCartItems = cartWithProducts.filter(item => item !== null);
        res.json(validCartItems);
    } catch (error) {
        console.error('Get Cart Error:', error);
        res.status(500).send('Server error');
    }
};

exports.updateCartItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity, selectedSize, selectedColor } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const cartItem = user.cart.id(itemId);

        if (!cartItem) {
            return res.status(404).json({ msg: 'Cart item not found' });
        }

        if (quantity) cartItem.quantity = quantity;
        if (selectedSize) cartItem.selectedSize = selectedSize;
        if (selectedColor) cartItem.selectedColor = selectedColor;

        await user.save();
        res.json(user.cart);
    } catch (error) {
        console.error('Update Cart Item Error:', error);
        res.status(500).send('Server error');
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.productId === productId);
        
        if (cartItemIndex === -1) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        user.cart.splice(cartItemIndex, 1);

        await user.save();
        
        console.log('Cart after removal:', user.cart);
        res.json(user.cart);
    } catch (error) {
        console.error('Remove from Cart Error:', error);
        res.status(500).json({ 
            msg: 'Server error', 
            error: error.message 
        });
    }
};