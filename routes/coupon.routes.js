const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');

router.post('/coupons', couponController.createCoupon)
router.get('/coupons', couponController.getAllCoupons)

module.exports = router;