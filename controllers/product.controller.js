const Product = require('../models/product.model')
const Cart = require('../models/product.model')

exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.removeProductFromCart = async (req, res) => {
    const { userId, productId } = req.body; // Get userId and productId from request

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        // Check if the product is in the cart
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(400).json({ message: 'Product not found in the cart' });
        }

        // Get the price and quantity of the product to adjust the cart total
        const removedProduct = cart.items[productIndex];
        const productTotal = removedProduct.quantity * removedProduct.productId.price;

        // Remove the product from the items array
        cart.items.splice(productIndex, 1);

        // Update the total price of the cart
        cart.total -= productTotal;

        // Save the updated cart
        await cart.save();

        return res.status(200).json({
            message: 'Product removed from cart successfully',
            cart
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
