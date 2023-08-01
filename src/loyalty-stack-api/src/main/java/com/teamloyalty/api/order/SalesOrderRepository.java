package com.teamloyalty.api.order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesOrderRepository extends JpaRepository<SalesOrder, Long> {
	
	List<SalesOrder> findByCustomerId(Long customerId);
	
	//TODO: Optional<SalesOrder>
	SalesOrder findByCustomerIdAndId(Long customerId, Long id);

}
