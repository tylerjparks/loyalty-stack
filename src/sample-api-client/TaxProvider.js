export class TaxProvider {
    static calcSalesTax(orderDetail) {
        let netAmount = orderDetail.lineNetAmount;
        let qty = orderDetail.quantity;
        let discount = orderDetail.lineDiscountAmount;
        // Texas 8.25% sales tax
        orderDetail.lineTaxAmount = Math.round(((netAmount * qty - discount) * 0.0825 + Number.EPSILON) * 100) / 100;
    }
}