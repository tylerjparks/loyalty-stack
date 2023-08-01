import { ShoppingCart } from "./ShoppingCart.js";
import { TaxProvider } from "./TaxProvider.js";
import { ShippingProvider } from './ShippingProvider.js';
import { PaymentProvider } from './PaymentProvider.js';

let cart = new ShoppingCart();
cart.setCustomerId(1);
cart.setShippingAddress("Brad", "Davis", "123 Main", "Denton", "TX", "USA", "75090");
cart.addLineItem("CX2675", "Ms. Pac-Man", "img.jpg", 50.0, 1, 0.0);
cart.addLineItem("CX2646", "Pac-Man", "img.jpg", 5.0, 1, 0.0);
cart.setTender("MC", 50.0, "4111111111111111", "Brad", "Davis", "75090");
ShippingProvider.calculateShipping(cart);
cart.updateHeaderTotals();
console.log(cart);