package com.teamloyalty.api.loyalty;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
	
	public Optional<Enrollment> findByCustomerId(Long customerId);

}
