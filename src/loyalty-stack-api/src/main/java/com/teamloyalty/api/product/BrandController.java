package com.teamloyalty.api.product;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
class BrandController {
	
	private final BrandRepository repository;
	
	BrandController(BrandRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/brands")
	List<Brand> all() {
		return repository.findAll();
	}

}
