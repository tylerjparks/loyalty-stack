package com.teamloyalty.api.product;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
class ProductLevelController {
	
	private final ProductLevelRepository repository;
	
	ProductLevelController(ProductLevelRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/productlevels")
	List<ProductLevel> all() {
		return repository.findAll();
	}

}
