package com.teamloyalty.api.customer;

class CustomerRequestInvalidException extends RuntimeException {
	
	CustomerRequestInvalidException(Long id) {
		super("Invalid update for customer: " + id);
	}

}
