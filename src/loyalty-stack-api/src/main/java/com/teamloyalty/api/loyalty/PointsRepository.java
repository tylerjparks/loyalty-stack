package com.teamloyalty.api.loyalty;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PointsRepository extends JpaRepository<Points, Long> {
	
	@Query(value = "SELECT IFNULL(SUM(amount),0) FROM Points p where p.customerId=:customerId")
	Long getPoinstBalance(@Param("customerId") Long customerId);
	
	List<Points> findByCustomerId(Long customerId);

}
