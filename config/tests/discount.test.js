const applyDiscount = require('../discount'); // Update the path to your applyDiscount function

describe('applyDiscount', () => {
    const cart = {
        total: 1000,
        items: [
            {
                productId: {
                    _id: 'product1',
                    price: 500
                },
                quantity: 2
            }
        ]
    };

    test('should apply cart-wide discount correctly', () => {
        const coupon = {
            discountType: 'cart',
            discountValue: 10, // 10%
            minCartValue: 500,
        };
        const discount = applyDiscount(coupon, cart);
        expect(discount).toBe(100); // 10% of 1000
    });

    test('should apply product-specific discount correctly', () => {
        const coupon = {
            discountType: 'product',
            discountValue: 20, // 20%
            productId: 'product1'
        };
        const discount = applyDiscount(coupon, cart);
        expect(discount).toBe(200); // 20% of (500 * 2)
    });

    test('should apply buy X get Y free discount correctly', () => {
        const coupon = {
            discountType: 'BxGy',
            productId: 'product1',
            buyQuantity: 2,
            getQuantity: 1 // 1 free for every 2 bought
        };
        const discount = applyDiscount(coupon, cart);
        expect(discount).toBe(500); // 1 free item worth 500
    });

    test('should not apply cart-wide discount if total is below minCartValue', () => {
        const lowCart = { ...cart, total: 300 }; // Total less than minCartValue
        const coupon = {
            discountType: 'cart',
            discountValue: 10,
            minCartValue: 500,
        };
        const discount = applyDiscount(coupon, lowCart);
        expect(discount).toBe(0); // No discount should be applied
    });

    test('should not apply product-specific discount if product is not in cart', () => {
        const coupon = {
            discountType: 'product',
            discountValue: 20,
            productId: 'nonExistentProduct'
        };
        const discount = applyDiscount(coupon, cart);
        expect(discount).toBe(0); // No discount should be applied
    });

    test('should not apply buy X get Y free discount if quantity is insufficient', () => {
        const insufficientCart = {
            ...cart,
            items: [{
                productId: {
                    _id: 'product1',
                    price: 500
                },
                quantity: 1 // Less than buyQuantity
            }]
        };
        const coupon = {
            discountType: 'BxGy',
            productId: 'product1',
            buyQuantity: 2,
            getQuantity: 1 // 1 free for every 2 bought
        };
        const discount = applyDiscount(coupon, insufficientCart);
        expect(discount).toBe(0); // No discount should be applied
    });
});
