const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['cart_type', 'product_type', 'bxgy'] },
    details: { type: Object, required: true },
    expiry: { type: Date, required: true },
    isActive: { type: Boolean, required: true }
})

module.exports = mongoose.model('Coupon', couponSchema);