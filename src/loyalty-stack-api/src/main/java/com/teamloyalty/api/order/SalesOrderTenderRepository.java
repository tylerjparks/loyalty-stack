package com.teamloyalty.api.order;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesOrderTenderRepository extends JpaRepository<SalesOrderTender, Long> {
	
	SalesOrderTender findBySalesOrderId(Long salesOrderId);

}
