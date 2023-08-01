package com.teamloyalty.api.loyalty;

public class EnrollmentNotFoundException extends RuntimeException {
	
	public EnrollmentNotFoundException(Long id) {
		super("Coould not find Enrollment for Customer: " + id);
	}

}
