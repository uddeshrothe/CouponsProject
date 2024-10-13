const Coupon = require('../models/coupon.model')

const getApplicableCoupons = async (cart) => {
    try {
        // Fetch all active coupons which are not expired
        const today = new Date();
        const activeCoupons = await Coupon.find({
            isActive: true,
            expiryDate: { $gte: today }
        });

        const applicableCoupons = activeCoupons.filter(coupon => {
            let isApplicable = false;

            // Cart-wise discount coupon
            if (coupon.discountType === 'cart' && cart.total >= coupon.minCartValue) {
                isApplicable = true;
            }

            // Product-specific coupon
            else if (coupon.discountType === 'product') {
                const productExists = cart.items.some(item => item.productId._id.toString() === coupon.productId.toString());
                if (productExists) {
                    isApplicable = true;
                }
            }

            // Buy X Get Y Free (BxGy) coupon
            else if (coupon.discountType === 'BxGy') {
                const product = cart.items.find(item => item.productId._id.toString() === coupon.productId.toString());
                if (product && product.quantity >= coupon.buyQuantity) {
                    isApplicable = true;
                }
            }

            return isApplicable;
        });

        return applicableCoupons;
    } catch (error) {
        console.error("Error fetching applicable coupons:", error.message);
        throw error;
    }
};

module.exports = getApplicableCoupons;