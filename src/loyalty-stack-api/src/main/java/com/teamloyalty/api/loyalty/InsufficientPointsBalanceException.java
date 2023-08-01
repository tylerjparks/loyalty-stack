package com.teamloyalty.api.loyalty;

public class InsufficientPointsBalanceException extends RuntimeException {
	
	public InsufficientPointsBalanceException(Long id) {
		super("Insufficient points balance for redemption requested for Customer: " + id);
	}

}
