const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, required: true, enum: ['cart', 'product', 'BxGy'] },
  discountValue: { type: Number, required: false },
  minCartValue: { type: Number, required: false },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
  buyQuantity: { type: Number, required: false },
  getQuantity: { type: Number, required: false },
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
