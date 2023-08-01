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
class SalesOrderTenderController {
	
	private final SalesOrderRepository orderRepository;
	private final SalesOrderTenderRepository tenderRepository;
	
	SalesOrderTenderController(SalesOrderRepository orderRepository, SalesOrderTenderRepository tenderRepository) {
		this.orderRepository = orderRepository;
		this.tenderRepository = tenderRepository;
	}
	
	@GetMapping("/orders/{salesOrderId}/tender")
	SalesOrderTender oneByOrderId(@PathVariable Long salesOrderId) {
		return tenderRepository.findBySalesOrderId(salesOrderId);
	}
	
	@PostMapping("/orders/{salesOrderId}/tender")
	SalesOrderTender newTender(@PathVariable Long salesOrderId, @RequestBody SalesOrderTender newSalesOrderTender) {
		return orderRepository.findById(salesOrderId).map( salesOrder -> {
			newSalesOrderTender.setSalesOrder(salesOrder);
            return tenderRepository.save(newSalesOrderTender);
        }).orElseThrow(() -> new ResourceNotFoundException("SalesOrderId " + salesOrderId + " not found"));
	}
	
}
