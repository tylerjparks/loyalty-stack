package com.teamloyalty.api.customer;

import com.teamloyalty.api.loyalty.ActivityType;
import com.teamloyalty.api.loyalty.Enrollment;
import com.teamloyalty.api.loyalty.EnrollmentNotFoundException;
import com.teamloyalty.api.loyalty.EnrollmentRepository;
import com.teamloyalty.api.loyalty.InsufficientPointsBalanceException;
import com.teamloyalty.api.loyalty.PointsRepository;
import com.teamloyalty.api.loyalty.Points;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;

@CrossOrigin
@RestController
class CustomerController {
	
	private final CustomerRepository repository;
	private final EnrollmentRepository enrollmentRepository;
	private final PointsRepository pointsRepository;
	
	CustomerController(CustomerRepository repository, EnrollmentRepository enrollmentRepository, PointsRepository pointsRepository) {
		this.repository = repository;
		this.enrollmentRepository = enrollmentRepository;
		this.pointsRepository = pointsRepository;
	}
	
	@GetMapping("/customers")
	List<Customer> all() {
		return repository.findAll();
	}

	@PostMapping("/customers")
	Customer newCustomer(@RequestBody Customer newCustomer) {
		Customer savedCustomer = repository.save(newCustomer);
		if (savedCustomer.getJoinLoyalty()) {
			// Create a new Loyalty program enrollment and save if Customer wants to join
			Enrollment enrl = new Enrollment(savedCustomer.getId(), "A", LocalDateTime.now(), Enrollment.generateCardNumber());
			Enrollment enrollment = this.enrollmentRepository.save(enrl);
			savedCustomer.setEnrollment(enrollment);
		}
		return savedCustomer;
	}
	
	@PutMapping("/customers/{id}")
	Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer) throws CustomerRequestInvalidException {
		if (!Objects.equals(id, customer.getId()))
			throw new CustomerRequestInvalidException(id);
		customer.setUpdateDate(LocalDateTime.now());
		return repository.save(customer);
	}
	
	@GetMapping("/customers/{id}")
	Customer one(@PathVariable Long id) {
		Customer cust = repository.findById(id).orElseThrow(() -> new CustomerNotFoundException(id));
		// Retrieve loyalty enrollment record with account/card number if Customer joined Loyalty
		if (cust.getJoinLoyalty()) {
			Optional<Enrollment> enrl = enrollmentRepository.findByCustomerId(cust.getId());
			cust.setEnrollment(enrl.get());
		}
		return cust;
	}
	
	@GetMapping(value="customers/{id}/pointshistory")
	List<Points> getPointsHistory(@PathVariable Long id) {
		Customer cust = repository.findById(id).orElseThrow(() -> new CustomerNotFoundException(id));
		Enrollment enrl = enrollmentRepository.findByCustomerId(cust.getId()).orElseThrow(
				() -> new EnrollmentNotFoundException(cust.getId()));
		if (enrl.getStatus() == "A") {
			// Get point balance from repository
			return this.pointsRepository.findByCustomerId(id);
		}
		else {
			// TODO: Exception/message for inactive customer
			return null;
		}
	}
	
	@GetMapping(value="customers/{id}/pointsbalance", produces="application/json")
	String getPointBalance(@PathVariable Long id) {
		Customer cust = repository.findById(id).orElseThrow(() -> new CustomerNotFoundException(id));
		Enrollment enrl = enrollmentRepository.findByCustomerId(cust.getId()).orElseThrow(
				() -> new EnrollmentNotFoundException(cust.getId()));
		if (enrl.getStatus() == "A") {
			// Get point balance from repository
			Long balance = this.pointsRepository.getPoinstBalance(cust.getId());
			return "{ \"pointsBalance\": \"" + balance + "\" }";
		}
		else {
			// TODO: Exception/message for inactive customer
			return "{ \"pointsBalance\": \"0\" }";
		}
	}
	
	// A simplified redemption model
	// This needs to be refactored and fleshed out to deal with Reward, Certificate and Txn entities
	@PutMapping(value="customers/{id}/redeempoints/{pointsAmount}", produces="application/json")
	String redeemPoints(@PathVariable Long id, @PathVariable Long pointsAmount) {
		Customer cust = repository.findById(id).orElseThrow(() -> new CustomerNotFoundException(id));
		Enrollment enrl = enrollmentRepository.findByCustomerId(cust.getId()).orElseThrow(
				() -> new EnrollmentNotFoundException(cust.getId()));
		if (enrl.getStatus() == "A") {
			// Get point balance from repository
			Long balance = this.pointsRepository.getPoinstBalance(cust.getId());
			if (pointsAmount > balance) {
				throw new InsufficientPointsBalanceException(cust.getId());
			}
			Points redeemPoints = new Points(
					cust.getId(),
					ActivityType.POINTS_REDEEM,
					null, "RWRD_DISCOUNT",
					pointsAmount * -1,
					0L, //TODO: Capture tx ID
					LocalDateTime.now()
					);
			Points p = this.pointsRepository.save(redeemPoints);
			try {
			String response = new JSONObject()
					.put("certificateNumber", UUID.randomUUID())
					.put("rewardCode", "RWRD_DICSOUNT")
					.put("dollarValue", pointsAmount / 100.0)
					.put("date", LocalDateTime.now())
					.toString();
			return response;
			}
			catch (Exception ex) { return ""; }
		}
		else {
			// TODO: Exception/message for inactive customer
			return "";
		}
	}
	
	@ControllerAdvice
	class ControllerExceptionHandler {
	    @ResponseStatus(HttpStatus.NOT_FOUND) 
	    @ExceptionHandler(CustomerNotFoundException.class)
	    public ResponseEntity<?> elementNotFound() {
	        return ResponseEntity.notFound().build();
	    }
	    
	    @ResponseStatus(HttpStatus.NOT_FOUND)
	    @ExceptionHandler(EnrollmentNotFoundException.class)
	    public ResponseEntity<?> enrollmentNotFound() {
	    	return ResponseEntity.notFound().build();
	    }
	    
	    @ResponseStatus(HttpStatus.BAD_REQUEST)
	    @ExceptionHandler(CustomerRequestInvalidException.class)
	    public ResponseEntity<?> badRequest() {
	    	return ResponseEntity.badRequest().build();
	    }
	    
	    @ResponseStatus(HttpStatus.BAD_REQUEST)
	    @ExceptionHandler(InsufficientPointsBalanceException.class)
	    public ResponseEntity<?> insufficientPoints() {
	    	return ResponseEntity.badRequest().build();
	    }
	}
}
