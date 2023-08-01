export class ShoppingCart {
    constructor() {
        this.customerId = null;
        this.status = "A";
        this.date = new Date().toISOString(); // fix at time of order processing
        this.salesOrderShippingAddress = null;
        this.tender = null;
        this.salesOrderDetails = [];
        this.netAmount = 0.0;
        this.taxAmount = 0.0;
        this.discountAmount = 0.0;
        this.shippingAndHandling = 0.0;
        this.grossAmount = 0.0;
    }

    setCustomerId(customerId) {
        this.customerId = customerId;
    }

    setShippingAddress(firstName, lastName, address, city, state, country, postal) {
        this.salesOrderShippingAddress = { 
            "firstName": firstName,
            "lastName": lastName, 
            "address": address,
            "city": city,
            "state": state,
            "country": country,
            "postal": postal
        };
    }

    setTender(codeTender, amount, paymentCardNumber, paymentCardFirstName, paymentCardLastName, paymentCardZip) {
        this.tender = {
            "codeTender": codeTender,
            "amount": amount,
            "paymentCardNumber": paymentCardNumber,
            "paymentCardFirstName": paymentCardFirstName,
            "paymentCardLastName": paymentCardLastName,
            "paymentCardZip": paymentCardZip
        }
    }

    updateTimestamp() {
        this.date = new Date().toISOString();
    }

    updateHeaderTotals() {
        // Sum up net amounts
        this.netAmount = this.salesOrderDetails.map(lineItem => lineItem.lineNetAmount).reduce((prev, next) => prev + next);
        // Sum up tax amounts
        this.taxAmount = this.salesOrderDetails.map(lineItem => lineItem.lineTaxAmount).reduce((prev, next) => prev + next);
        // Sum up discount amounts (all 0.0 for now)
        this.discountAmount = this.salesOrderDetails.map(lineItem => lineItem.lineDiscountAmount).reduce((prev, next) => prev + next);
        // Sum up gross amounts plus S&H
        this.grossAmount = this.salesOrderDetails.map(lineItem => lineItem.lineGrossAmount).reduce((prev, next) => prev + next) + this.shippingAndHandling;
    }

    addLineItem(productCode, productName, productImg, unitPrice, quantity, lineDiscountAmount) {
        let nextItemNo = this.salesOrderDetails.length + 1;
        let cartItem = {
            "lineNumber": nextItemNo,
            "productCode": productCode,
            "productName": productName,
            "productImg": productImg,
            "unitPrice": unitPrice,
            "quantity": quantity,
            "lineNetAmount": unitPrice * quantity,  // -discountAmount
            "lineDiscountAmount": 0.0,
            "status": lineDiscountAmount,
            "lineTaxAmount" : 0.0,
            "lineGrossAmount": 0.0
        };
        this.salesOrderDetails.push(cartItem);
        this.updateHeaderTotals();
    }

}