package com.teamloyalty.api.order;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.teamloyalty.api.loyalty.EnrollmentRepository;
import com.teamloyalty.api.product.ProductRepository;
import com.teamloyalty.api.loyalty.BonusRule;
import com.teamloyalty.api.loyalty.BonusRuleRepository;
import com.teamloyalty.api.loyalty.Enrollment;
import com.teamloyalty.api.loyalty.EnrollmentNotFoundException;
import com.teamloyalty.api.loyalty.Points;
import com.teamloyalty.api.loyalty.PointCalculator;
import com.teamloyalty.api.loyalty.PointsRepository;

@CrossOrigin
@RestController
class SalesOrderController {
	
	private final SalesOrderRepository repository;
	private final EnrollmentRepository enrollmentRepository;
	private final ProductRepository productRepository;
	private final BonusRuleRepository bonusRuleRepository;
	private final PointsRepository pointsRepository;
	
	SalesOrderController(SalesOrderRepository repository, EnrollmentRepository enrollmentRepository, 
			ProductRepository productRepository, BonusRuleRepository bonusRuleRepository, PointsRepository pointsRepository) {
		this.repository = repository;
		this.enrollmentRepository = enrollmentRepository;
		this.productRepository = productRepository;
		this.bonusRuleRepository = bonusRuleRepository;
		this.pointsRepository = pointsRepository;
	}

	@GetMapping("/orders")
	List<SalesOrder> all() {
		return repository.findAll();
	}
	
	@GetMapping("/customers/{id}/orders")
	List<SalesOrder> allByCustomerId(@PathVariable Long id)
	{
		return repository.findByCustomerId(id);
	}
	
	@GetMapping("/customers/{id}/orders/{orderId}")
	SalesOrder oneByCustomerId(@PathVariable Long id, @PathVariable Long orderId) {
		return repository.findByCustomerIdAndId(id, orderId);
		// TODO: Attach any earned points to this sales order
		// Also use Optional pattern, throw exception for not found
	}
	
	//TODO: PostMapping by customerId
	@PostMapping("/orders")
	SalesOrder newOrder(@RequestBody SalesOrder newOrder) {
		SalesOrder createdOrder = repository.save(newOrder);
		Optional<Enrollment> enrl = enrollmentRepository.findByCustomerId(createdOrder.getCustomerId());
		//.orElseThrow(() -> new EnrollmentNotFoundException(createdOrder.getCustomerId()));
		if (enrl.isPresent() && enrl.get().getStatus() == "A") {
			// Customer is an active Loyalty member
			// Load and evaluate bonus rules and issue points
			// TODO: Cache these rules
			List<BonusRule> rules = this.bonusRuleRepository.findAll();
			PointCalculator pcalc = new PointCalculator(rules, this.productRepository);
			List<Points> pointOutcomes = pcalc.evaluateSalesOrder(createdOrder);
			List<Points> savedPoints = this.pointsRepository.saveAll(pointOutcomes);
			// Attach to the SalesOrder response
			createdOrder.setPoints(savedPoints);
		}
		return createdOrder;
	}

}
