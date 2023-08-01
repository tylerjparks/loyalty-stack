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
class SalesOrderShippingAddressController {
	
	private final SalesOrderRepository orderRepository;
	private final SalesOrderShippingAddressRepository shippingRepository;
	
	SalesOrderShippingAddressController(SalesOrderRepository orderRepository, SalesOrderShippingAddressRepository shippingRepository) {
		this.orderRepository = orderRepository;
		this.shippingRepository = shippingRepository;
	}
	
	@GetMapping("/orders/{salesOrderId}/shipping")
	SalesOrderShippingAddress oneByOrderId(@PathVariable Long salesOrderId) {
		return shippingRepository.findBySalesOrderId(salesOrderId);
	}
	
	@PostMapping("/orders/{salesOrderId}/shipping")
	SalesOrderShippingAddress newShipping(@PathVariable Long salesOrderId, @RequestBody SalesOrderShippingAddress newSalesOrderShippingr) {
		return orderRepository.findById(salesOrderId).map( salesOrder -> {
			newSalesOrderShippingr.setSalesOrder(salesOrder);
            return shippingRepository.save(newSalesOrderShippingr);
        }).orElseThrow(() -> new ResourceNotFoundException("SalesOrderId " + salesOrderId + " not found"));
	}

}
