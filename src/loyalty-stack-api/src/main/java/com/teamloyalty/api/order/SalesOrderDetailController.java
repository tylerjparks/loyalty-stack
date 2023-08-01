package com.teamloyalty.api.order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
class SalesOrderDetailController {
	
	private final SalesOrderRepository orderRepository;
	private final SalesOrderDetailRepository detailRepository;
	
	SalesOrderDetailController(SalesOrderRepository orderRepository, SalesOrderDetailRepository detailRepository) {
		this.orderRepository = orderRepository;
		this.detailRepository = detailRepository;
	}
	
	@GetMapping("/orders/{salesOrderId}/details")
	List<SalesOrderDetail> allByOrderId(@PathVariable Long salesOrderId) {
		return detailRepository.findBySalesOrderId(salesOrderId);
	}
	
	@PostMapping("/orders/{salesOrderId}/details")
	SalesOrderDetail newOrderDetail(@PathVariable Long salesOrderId, @RequestBody SalesOrderDetail newSalesOrderDetail) {
		return orderRepository.findById(salesOrderId).map( salesOrder -> {
			newSalesOrderDetail.setSalesOrder(salesOrder);
            return detailRepository.save(newSalesOrderDetail);
        }).orElseThrow(() -> new ResourceNotFoundException("SalesOrderId " + salesOrderId + " not found"));
	}

}
