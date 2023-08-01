export class ShippingProvider {
    static calculateShipping(cart) {
        // Just a flat rate
        cart.shippingAndHandling = 10.0;
    }
}