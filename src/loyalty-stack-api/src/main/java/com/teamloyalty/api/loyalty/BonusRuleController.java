package com.teamloyalty.api.loyalty;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;

@CrossOrigin
@RestController
class BonusRuleController {
	
	private final BonusRuleRepository repository;
	
	BonusRuleController(BonusRuleRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/offers")
	List<BonusRule> all() {
		return repository.findAll();
	}

}
