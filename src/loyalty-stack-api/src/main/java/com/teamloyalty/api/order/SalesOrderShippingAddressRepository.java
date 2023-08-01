package com.teamloyalty.api.order;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesOrderShippingAddressRepository extends JpaRepository<SalesOrderShippingAddress, Long> {
	
	SalesOrderShippingAddress findBySalesOrderId(Long salesOrderId);

}
