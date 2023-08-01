export class TaxProvider {
    static calcSalesTax(cart) {
        for (let orderDetail of cart.salesOrderDetails) {
            let netAmount = orderDetail.lineNetAmount;
            let qty = orderDetail.quantity;
            let discount = orderDetail.lineDiscountAmount;
            // Texas 8.25% sales tax
            orderDetail.lineTaxAmount = Math.round(((netAmount * qty - discount) * 0.0825 + Number.EPSILON) * 100) / 100;
            orderDetail.lineGrossAmount = orderDetail.lineNetAmount + orderDetail.lineTaxAmount;
        }
        cart.taxAmount = cart.salesOrderDetails.map(lineItem => lineItem.lineTaxAmount).reduce((prev, next) => prev + next);
    }
}