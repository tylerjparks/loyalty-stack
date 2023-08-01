package com.teamloyalty.api.product;

class ProductNotFoundException extends RuntimeException {
	
	ProductNotFoundException(Long id) {
		super("Could not find product: " + id);
	}
	
	ProductNotFoundException(String code) {
		super("Could not find product: " + code);
	}

}
