package com.teamloyalty.api.product;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
class ProductHierarchyController {
	
	private final ProductHierarchyRepository repository;
	
	ProductHierarchyController(ProductHierarchyRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/producthierarchy")
	List<ProductHierarchy> all() {
		return repository.findAll();
	}

}
