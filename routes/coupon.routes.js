const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');

router.post('/coupons', couponController.createCoupon)
router.get('/coupons', couponController.getAllCoupons)
router.get('/coupons/:id', couponController.getCouponById);
router.delete('/coupons/:id', couponController.deleteCoupon);
router.put('/coupons/:id', couponController.updateCoupon);

router.post('/apply', couponController.applyCoupon);
router.post('/create', couponController.createCoupon);
router.post('/remove', couponController.removeCoupon);
router.post('/applicablecoupons', couponController.getCouponsForCart);

module.exports = router;