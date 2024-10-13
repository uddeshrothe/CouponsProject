const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
  total: { type: Number, required: true, default: 0 },
  couponApplied: {type: Boolean, default:false}
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
