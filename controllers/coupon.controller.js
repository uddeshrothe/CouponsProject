const Coupon = require('../models/coupon.model');
const Cart = require('../models/cart.model');
const applyDiscount = require('../config/discount')
const getCoupons = require('../config/applicableCoupons')

// Create coupon
exports.createCoupon = async (req, res) => {
    try {
        const { code, discountType, discountValue, minCartValue, productId, buyQuantity, getQuantity, expiryDate } = req.body;

        const coupon = new Coupon({
            code,
            discountType,
            discountValue,
            minCartValue,
            productId,
            buyQuantity,
            getQuantity,
            expiryDate
        });

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
        res.status(200).json({ message: "Coupon deleted successfully!" })
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

// Apply coupon to cart and update cart total
exports.applyCoupon = async (req, res) => {
    const { userId, code } = req.body;

    try {
        // Find the coupon by code
        const coupon = await Coupon.findOne({ code });

        if (!coupon || !coupon.isActive) {
            return res.status(400).json({ message: 'Invalid or expired coupon' });
        }

        // Check if the coupon has expired
        if (new Date(coupon.expiryDate) < new Date()) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        // Check if a coupon has already been applied
        if (cart.couponApplied) {
            return res.status(400).json({ message: 'A coupon has already been applied.' });
        }

        // Apply discount based on the coupon and cart
        const discount = applyDiscount(coupon, cart);
        const updatedTotal = cart.total - discount;

        // Update the cart's total and mark the coupon as applied
        cart.total = updatedTotal > 0 ? updatedTotal : 0;  // Ensure total is never negative
        cart.couponApplied = true;  // Mark that a coupon is applied
        cart.couponCode = code;  // Optionally store the applied coupon code
        await cart.save();  // Save the updated cart

        return res.status(200).json({
            message: 'Coupon applied successfully',
            discount,
            newTotal: cart.total
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Remove coupon from cart and restore original total
exports.removeCoupon = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart) {
        return res.status(400).json({ message: 'Cart not found' });
      }
  
      if (!cart.couponApplied) {
        return res.status(400).json({ message: 'No coupon has been applied to this cart.' });
      }
  
      // Calculate the original total (revert to the total without the discount)
      let originalTotal = 0;
      cart.items.forEach(item => {
        originalTotal += item.productId.price * item.quantity;
      });
  
      cart.total = originalTotal;
      cart.couponApplied = false;  // Mark coupon as removed
      cart.couponCode = null;      // Clear the applied coupon code
      await cart.save();           // Save the updated cart
  
      return res.status(200).json({
        message: 'Coupon removed successfully',
        newTotal: cart.total
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};
  
exports.getCouponsForCart = async (req, res) => {
    const { userId } = req.body;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        // Get applicable coupons
        const applicableCoupons = await getCoupons(cart);

        return res.status(200).json({
            message: 'Applicable coupons retrieved successfully',
            coupons: applicableCoupons
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

  
