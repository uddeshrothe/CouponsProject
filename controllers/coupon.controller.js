const Coupon = require('../models/coupon.model');
const Cart = require('../models/cart.model');

// Create coupon
exports.createCoupon = async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json({ message: 'Coupon created successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get All Coupons
exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}