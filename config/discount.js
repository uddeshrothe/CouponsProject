const applyDiscount = (coupon, cart) => {
  let discount = 0;

  if (coupon.discountType === 'cart' && cart.total >= coupon.minCartValue) {
    discount = (coupon.discountValue / 100) * cart.total;
  } else if (coupon.discountType === 'product') {
    // Find the product in the cart that matches the coupon's productId
    const product = cart.items.find(item => item.productId._id.toString() === coupon.productId.toString());

    if (product) {
      // Apply discount to the price * quantity of the specific product
      discount = (coupon.discountValue / 100) * product.productId.price * product.quantity;
    }

  } else if (coupon.discountType === 'BxGy') {
    const product = cart.items.find(item => item.productId._id.toString() === coupon.productId.toString());
    if (product && product.quantity >= coupon.buyQuantity) {
      // Calculate how many free items the user is eligible for
      const setsOfBuy = Math.floor(product.quantity / coupon.buyQuantity); 
            
      // Free items
      const eligibleFreeItems = setsOfBuy * coupon.getQuantity;

      // Calculate discount
      discount = eligibleFreeItems * product.productId.price;
      
    }
  }

  return discount;
};

module.exports = applyDiscount;
