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

// Get Coupon by Id
exports.getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) { return res.json(404).json({ message: "Coupon not found." }) }
        res.status(200).json(coupon)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a Coupon
exports.deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) return res.json(404).json({ message: "Coupon not found" });
        res.status(200).json({message: "Coupon deleted successfully!"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update a coupon
exports.updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!coupon) { return res.json(404).json({ message: "Coupon not found." }) }
        res.status(200).json(coupon)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}