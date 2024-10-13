Implemented Cases: 

Cart wise:

Case 1: A customer's cart exceed any specific threshold, the coupon applies to the cart.
Case 2: A customer can check applicable coupons and apply which gives more discount.
Case 3: A cart-wise coupon requires a minimum purchase quantity of a specific product or category to be applied.

Product wise:

Case 1: A customer has a product in their cart that matches the coupon's criteria, then the coupon can be applied.
Case 2: A customer can only apply one coupon to a specific product or their whole cart.
Case 3: Even if customer has different products in the cart, the coupon will only work on that specific product.

BxGy: 

Case 1(Buy 2 get 1 free):  Customer add 3 quantities of the product and after applying the corresponding coupon gets the price of 1 deducted from total amount.
Case 2(Buy 2 get 1 free):  The coupon is stackable.


Unimplemented Cases:

Case 1: To exclude any specific product or category from cart wise discount.
Case 2: To give customer the best coupon as per their cart amount.
Case 3: To put some condition to apply product wise discount like Customer need to buy 2 quantities for the coupon to be applicable.
Case 4: To set a limit to the discount amount so it does not exceed the threshold limit e.g. Customer buys 10 quantity the coupon should have certail limit like 10% upto 1500.
Case 5: Exclude sale/promotional items from cart discount.
Case 6: Coupons for specific occasions like customer's birthday.
Case 7: One time coupons for new users.
Case 8: More items more discount coupons like "Buy 3 items, get 5%off" or "Buy 4 items, get 10% off".
Case 9: Category specific coupons like T-shirts, shoes, etc.
Case 10: Coupons for specific products are working on based on it's id, so it's a limitation if coupon can be applied to a single product type.
Case 11: To create a robust and properly implemented BxGy offer for multiple products.
Case 12: To extend the logic of BxGy for multiple products, not a single one.
Case 13: No limit on discounts, even if customer buys 100 products they'll still get flat percentage of discount.

These are some of the cases which I could not implement given the time constraint.

Limitations: 

Case 1: Only one coupon is applicablea at a time.
Case 2: Applying multiple coupons or coupon stacking is possible but could get complex in implementing.
Case 3: Coupons for specific products are working on based on it's id, so it's a limitation if coupon can be applied to only a single product type.

Assumptions:

1: Customer will apply only one coupon on their order.
2: Customer will not order a huge quantities of products as there is not set limit of discount.
3: As only one coupon can be applied, if customer has different products they can only use coupon on one of the products.



