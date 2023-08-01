package com.teamloyalty.api.order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesOrderDetailRepository extends JpaRepository<SalesOrderDetail, Long> {

	List<SalesOrderDetail> findBySalesOrderId(Long salesOrderId);
	
}
