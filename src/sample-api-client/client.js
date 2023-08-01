import fetch from 'node-fetch'; // Only needed for nodejs, in react fetch is provided by the browser
import {TaxProvider} from "./TaxProvider.js";
import { ShippingProvider } from './ShippingProvider.js';
import { PaymentProvider } from './PaymentProvider.js';


// *********** Pull back some products using a set of filters *********** 

console.log('\nPull back some products using a set of filters (System=2600, Genre=MAZE, Brand=ATARI)');

let response = await fetch('http://localhost:8080/api/products?System=2600&Genre=MAZE&Brand=ATARI');
const products = await response.json();

//console.log(products);

for (let index in products) {
    console.log("\n=== Product ===");
    let p = products[index];
    console.log("Product Code:", p.code);
    console.log("Product Name:", p.name);
    console.log("Product Price:", p.unitPrice);
    console.log("Product System Code:", p.level1);
    console.log("Product Genre Code:", p.level2);
    console.log("Product Brand Code: ", p.codeBrand);
    console.log("\n=== Product JSON ===");
    console.log(p);
}

// *********** Get Product by Product Code *********** 

console.log("\nGet Product by Product Code");

// Note the URI is "product" (singular)
response = await fetch('http://localhost:8080/api/product?code=CX2646');
const product = await response.json();

console.log('\n=== Product with code CX2646 ===');
console.log(product);

// *********** User Login *********** 

console.log("\nUser Login...");

let body = {
    "username": "brad", 
    "password": "password123"
};

response = await fetch('http://localhost:8080/api/auth/signin', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});

const jwt = await response.json();

console.log('\n=== User Login Token ===');
console.log(jwt);

// *********** Get Logged In User Details *********** 

console.log("\nGet Logged In User Details");

// ** Creation of the bearer token for the Authorization header
//    Using the jwt token we got in the last step
let authorization = "Bearer " + jwt.token;

// Note the passing of the Authorization header to make an authenticated request.
// This could be enforced in future phase, for accessing my customer record, my orders, my points, etc
response = await fetch('http://localhost:8080/api/me', {
	method: 'get',
	headers: {'Authorization': authorization}
});

const user = await response.json();

console.log('\n=== Logged In User Detail ===');
console.log(user);

// *********** Create User Login Credentials *********** 

// Should be done immediately after creating a new customer, 
// username/password gathered in the same create/update Customer form

console.log("\nCreate User Login Credentials");

let createUser = {
    "username": "tyler", 
    "password": "password123",
    "customerId": 2,
    "roles": [ "ROLE_USER" ]
};

console.log('\n=== User Creation Request ===');
console.log(createUser);

response = await fetch('http://localhost:8080/api/auth/register', {
	method: 'post',
	body: JSON.stringify(createUser),
	headers: {'Content-Type': 'application/json'}
});

const ok = await response.text();
console.log('\n=== User Login Creation ===');
console.log(ok);

// *********** Get Customer with id 2 *********** 

console.log('\nGet Customer with id 2');

response = await fetch('http://localhost:8080/api/customers/2');
const customer = await response.json();

console.log("\n=== Customer 2 ===");
console.log(customer);

// *********** Create a new customer *********** 

console.log('\nCreate a new Customer');

let newCustomer = {
    "firstName": "Warren",
    "lastName": "Robinett",
    "emailAddress": "warren.robinett@my.unt.edu",
    "address": "200 Oak St",
    "city": "Denton",
    "state": "TX",
    "country": "US",
    "postal": "76201",
    "phone": "214-555-8888"
}

response = await fetch('http://localhost:8080/api/customers', {
	method: 'post',
	body: JSON.stringify(newCustomer),
	headers: {'Content-Type': 'application/json'}
});
const customer2 = await response.json();

console.log("\n=== New Customer ===");
console.log(customer2);

// *********** Update the new customer first name *********** 

console.log('\nUpdate the new customer first name');

customer2.firstName = "Bobby";

// NOTE the use of PUT method/verb in the fetch request
// NOTE the URI now includes customerId
response = await fetch('http://localhost:8080/api/customers/' + customer2.id, {
	method: 'put',
	body: JSON.stringify(customer2),
	headers: {'Content-Type': 'application/json'}
});
const customer3 = await response.json();

// Display updated customer - id remains unchanged
console.log("\n=== Updated Customer ===");
console.log(customer3);

// *********** Build a new Cart and post to customer 2, purchasing product CX2675 (Ms. Pac-Man) *********** 

console.log('\nBuild a new Cart and post to customer 2, purchasing product CX2675 (Ms. Pac-Man)');

// Create a detail line item
let cartItem = {
    "lineNumber": 1,
    "productCode": "CX2675",
    "proudctName": "Ms. Pac-Man",
    "unitPrice": 50.0,
    "quantity": 1,
    "lineNetAmount": 50.0,
    "lineDiscountAmount": 0.0,
    "status": "A"
};

TaxProvider.calcSalesTax(cartItem);
cartItem.lineGrossAmount = cartItem.lineNetAmount + cartItem.lineTaxAmount;

// Create a shipping address (probably only during final checkout, and could be pre-populated with Customer object data)
let shippingAddress = {
    "firstName": "Tyler",
    "lastName": "Parks",
    "address": "321 Union",
    "city": "Denton",
    "state": "TX",
    "country": "US",
    "postal": "76201"
}

// Create a cart/salesOrder
// note that the order details is an array of 1 or more items
let cart = {
    "customerId": 2,
    "status": "A",
    "date":"2023-03-17T12:00:00.00000",
    "salesOrderShippingAddress": shippingAddress,
    "salesOrderDetails": [ cartItem ]
}

// Sum up net amounts
cart.netAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineNetAmount).reduce((prev, next) => prev + next);
// Sum up tax amounts
cart.taxAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineTaxAmount).reduce((prev, next) => prev + next);
// Sum up discount amounts (all 0.0 for now)
cart.discountAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineDiscountAmount).reduce((prev, next) => prev + next);
// Get Shipping and Handling
ShippingProvider.calculateShipping(cart);
// Sum up gross amounts plus S&H
cart.grossAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineGrossAmount).reduce((prev, next) => prev + next) + cart.shippingAndHandling;

// Now create a tender to pay for the order
let tender = {
    "codeTender": "MC",   // or 'VI', etc
    "amount": cart.grossAmount,
    "paymentCardNumber": "5111111111111111",
    "paymentCardFirstName": "Tyler",
    "paymentCardLastName": "Parks",
    "paymentCardZip": "76201"
}

// Process the payment and attach to the order
PaymentProvider.Authorize(tender);
PaymentProvider.Charge(tender);
cart.salesOrderTender = tender;

console.log("\n === Shopping Cart ===");
console.log(cart);

// Finally let's post the sales order to the customer account and log the reponse

console.log('\nPost the sales order to the customer account and log the reponse');

response = await fetch('http://localhost:8080/api/orders', {
	method: 'post',
	body: JSON.stringify(cart),
	headers: {'Content-Type': 'application/json'}
});
const salesOrder = await response.json();

// The new sales order object returned from the api/database
//  It looks almost the same, except the parent and child entities now have 'id' properties
//  which are primary keys in the database
console.log("\n === New Sales Order ===");
console.log(salesOrder);

// *********** Get orders by customerId and/or orderId *********** 

// In future these requests should be authenticated.
//  ie, matching customer must be logged in and must submit authorization header with valid token

console.log('\nGet orders by customerId and/or orderId');

response = await fetch('http://localhost:8080/api/customers/1/orders');
const orders = await response.json();

console.log("\n=== Customer 1 Orders ===");

for (let index in orders) {
    console.log("\n=== Order ===");
    let o = orders[index];
    console.log(o);
}

console.log('\nGet orderId 1 for customerId 1');

response = await fetch('http://localhost:8080/api/customers/1/orders/1');
const order = await response.json();

console.log("\n=== Order 1 for Customer 1 ===");
console.log(order);