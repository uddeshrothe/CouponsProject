const getApplicableCoupons = require('../applicableCoupons')
const Coupon = require('../../models/coupon.model')

// Mock Mongoose 
jest.mock('../../models/coupon.model');

describe('getApplicableCoupons', () => {
    const today = new Date();
    const activeCoupons = [
        {
            _id: 'coupon1',
            discountType: 'cart',
            minCartValue: 1000,
            isActive: true,
            expiryDate: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Active coupon (not expired)
        },
        {
            _id: 'coupon2',
            discountType: 'product',
            productId: 'product1',
            isActive: true,
            expiryDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
        {
            _id: 'coupon3',
            discountType: 'BxGy',
            productId: 'product2',
            buyQuantity: 2,
            getQuantity: 1,
            isActive: true,
            expiryDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
    ];

    const cart = {
        total: 1500,
        items: [
            { productId: { _id: 'product1', name: 'Product 1', price: 500 }, quantity: 2 },
            { productId: { _id: 'product2', name: 'Product 2', price: 300 }, quantity: 3 },
        ],
    };

    beforeEach(() => {
        // Reset mock before each test
        Coupon.find.mockReset();
    });

    it('should return applicable cart coupon if cart total is above minCartValue', async () => {
        // Mocking the coupon data to return active coupons
        Coupon.find.mockResolvedValue([activeCoupons[0]]); // Only cart coupon

        const result = await getApplicableCoupons(cart);

        expect(Coupon.find).toHaveBeenCalledWith({
            isActive: true,
            expiryDate: { $gte: expect.any(Date) },
        });

        // Expect that the cart coupon is returned
        expect(result).toEqual([activeCoupons[0]]);
    });

    it('should return applicable product coupon if product exists in cart', async () => {
        // Mocking the coupon data to return active product coupon
        Coupon.find.mockResolvedValue([activeCoupons[1]]); // Only product-specific coupon

        const result = await getApplicableCoupons(cart);

        // Expect that the product coupon is returned
        expect(result).toEqual([activeCoupons[1]]);
    });

    it('should return applicable BxGy coupon if product quantity is sufficient', async () => {
        // Mocking the coupon data to return active BxGy coupon
        Coupon.find.mockResolvedValue([activeCoupons[2]]); // Only BxGy coupon

        const result = await getApplicableCoupons(cart);

        // Expect that the BxGy coupon is returned
        expect(result).toEqual([activeCoupons[2]]);
    });

    it('should return multiple applicable coupons if conditions are met', async () => {
        // Mocking the coupon data to return multiple coupons
        Coupon.find.mockResolvedValue(activeCoupons); // All active coupons

        const result = await getApplicableCoupons(cart);

        // Expect that multiple coupons are returned
        expect(result).toEqual([activeCoupons[0], activeCoupons[1], activeCoupons[2]]);
    });

    it('should return an empty array if no coupons are applicable', async () => {
        // Mocking the coupon data to return an active coupon but the cart doesn't meet conditions
        Coupon.find.mockResolvedValue([{
            _id: 'coupon4',
            discountType: 'cart',
            minCartValue: 2000, // Higher than cart total
            isActive: true,
            expiryDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        }]);

        const result = await getApplicableCoupons(cart);

        // Expect no coupons to be applicable
        expect(result).toEqual([]);
    });

    it('should throw an error if fetching coupons fails', async () => {
        // Mock the find method to throw an error
        Coupon.find.mockRejectedValue(new Error('Database error'));

        await expect(getApplicableCoupons(cart)).rejects.toThrow('Database error');
    });
});