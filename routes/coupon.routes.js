const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');

router.post('/coupons', couponController.createCoupon)
router.get('/coupons', couponController.getAllCoupons)
router.get('/coupons/:id', couponController.getCouponById);
router.delete('/coupons/:id', couponController.deleteCoupon);
router.put('/coupons/:id', couponController.updateCoupon);

module.exports = router;