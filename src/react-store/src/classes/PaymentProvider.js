export class PaymentProvider {
    static Authorize(tender) {
        // Pretend we're authorizing the payment, generate an Auth code
        tender.codeAuth = "ABC123";
    }

    static Charge(tender) {
        // Pretend we're charging the payment to the code, generate a Ref number
        tender.codeRef = "1234567890";
    }
}