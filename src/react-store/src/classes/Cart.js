export class Cart {

    static createCart() {
        let newCart = {
            "customerId": null,
            "status": "A",
            "date": new Date().toISOString(),
            "salesOrderShippingAddress": null,
            "salesOrderTender": null,
            "salesOrderDetails": [],
            "netAmount": 0.0,
            "taxAmount": 0.0,
            "discountAmount": 0.0,
            "shippingAndHandling": 0.0,
            "grossAmount": 0.0
        };
        Cart.setShippingAddress(newCart, "", "", "", "", "", "", "");
        Cart.setTender(newCart, "", 0.0, "", "", "", "");
        return newCart;
    }

    static copyCart(cart) {
        return { ...cart };
    }

    static setCustomerId(cart, customerId) {
        cart.customerId = customerId;
    }

    static setShippingAddress(cart, firstName, lastName, address, city, state, country, postal) {
        cart.salesOrderShippingAddress = { 
            "firstName": firstName,
            "lastName": lastName, 
            "address": address,
            "city": city,
            "state": state,
            "country": country,
            "postal": postal
        };
    }

    static setTender(cart, codeTender, amount, paymentCardNumber, paymentCardFirstName, paymentCardLastName, paymentCardZip) {
        cart.salesOrderTender = {
            "codeTender": codeTender,
            "amount": amount,
            "paymentCardNumber": paymentCardNumber,
            "paymentCardFirstName": paymentCardFirstName,
            "paymentCardLastName": paymentCardLastName,
            "paymentCardZip": paymentCardZip
        }
    }

    static updateTimestamp(cart) {
        cart.date = new Date().toISOString();
    }

    static updateHeaderTotals(cart) {
        // Sum up net amounts
        cart.netAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineNetAmount).reduce((prev, next) => prev + next);
        // Sum up tax amounts
        cart.taxAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineTaxAmount).reduce((prev, next) => prev + next);
        // Sum up discount amounts (all 0.0 for now)
        cart.discountAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineDiscountAmount).reduce((prev, next) => prev + next);
        // Sum up gross amounts plus S&H
        cart.grossAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineGrossAmount).reduce((prev, next) => prev + next) + cart.shippingAndHandling;
    }

    static addLineItem(cart, productCode, productName, productImg, unitPrice, quantity, lineDiscountAmount) {
        let result = cart.salesOrderDetails.filter( detail => { return detail.productCode === productCode});
        if (result.length === 1 )
        {
            let cartDetail = result[0];
            cartDetail.quantity = parseInt(cartDetail.quantity) + parseInt(quantity);
            cartDetail.lineNetAmount = cartDetail.unitPrice * cartDetail.quantity;
            cartDetail.lineGrossAmount = cartDetail.lineNetAmount + cartDetail.lineTaxAmount;
        }
        else {
            let nextItemNo = cart.salesOrderDetails.length + 1;
            let cartItem = {
                "lineNumber": nextItemNo,
                "productCode": productCode,
                "productName": productName,
                "productImg": productImg,
                "unitPrice": unitPrice,
                "quantity": quantity,
                "lineNetAmount": unitPrice * quantity,
                "lineDiscountAmount": 0.0,
                "status": lineDiscountAmount,
                "lineTaxAmount" : 0.0,
                "lineGrossAmount": 0.0
            };
            cartItem.lineGrossAmount = cartItem.lineNetAmount + cartItem.lineTaxAmount;
            cart.salesOrderDetails.push(cartItem);
        }
        Cart.updateHeaderTotals(cart);
    }

    static applyDiscount(cart, discountAmount) {
        let discountRemaining = discountAmount;
        for (let detail of cart.salesOrderDetails) {
            let prorate = detail.lineNetAmount / cart.netAmount;
            let applyDiscount = prorate * discountAmount;
            discountRemaining -= applyDiscount;
            detail.lineDiscountAmount += applyDiscount;
            detail.lineNetAmount = (detail.unitPrice * detail.quantity) - detail.lineDiscountAmount;
            if (discountRemaining < 0.01) break;
        }
        Cart.updateHeaderTotals(cart);
    }

}