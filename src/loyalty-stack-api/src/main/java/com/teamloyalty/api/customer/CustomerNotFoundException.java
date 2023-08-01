package com.teamloyalty.api.customer;

class CustomerNotFoundException extends RuntimeException {
	
	CustomerNotFoundException(Long id) {
		super("Could not find customer: " + id);
	}

}
