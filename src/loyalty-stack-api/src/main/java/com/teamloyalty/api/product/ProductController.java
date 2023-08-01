package com.teamloyalty.api.product;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
class ProductController {
	
	private final ProductRepository repository;
	
	ProductController(ProductRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/productsearch")
	List<Product> search(@RequestParam(name="name") String name) {
		return repository.findByNameContainingIgnoreCase(name);
	}
	
	@GetMapping("/products")
	List<Product> all(@RequestParam(name="System", required = false) String level1,
			@RequestParam(name="Genre", required = false) String level2,
			@RequestParam(name="Brand", required = false) String codeBrand) {
		if (level1 != null)
			if (level2 != null)
				if (codeBrand != null)
					return repository.findByLevel1AndLevel2AndCodeBrand(level1, level2, codeBrand);
				else
					return repository.findByLevel1AndLevel2(level1, level2);
			else
				if (codeBrand != null)
					return repository.findByLevel1AndCodeBrand(level1, codeBrand);
				else
					return repository.findByLevel1(level1);
		else
			if (level2 != null)
				if (codeBrand != null)
					return repository.findByLevel2AndCodeBrand(level2, codeBrand);
				else
					return repository.findByLevel2(level2);
			else
				if (codeBrand != null)
					return repository.findByCodeBrand(codeBrand);
				else
					return repository.findAll();
			
	}
	
	@GetMapping("/products/{id}")
	Product one(@PathVariable Long id) {
		return repository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
	}
	
	// TODO: Revisit this design choice
	@GetMapping("/product")
	Product byCode(@RequestParam String code) {
		return repository.findByCode(code).orElseThrow(() -> new ProductNotFoundException(code));
	}
	
	@ControllerAdvice
	class ControllerExceptionHandler {
	    @ResponseStatus(HttpStatus.NOT_FOUND) 
	    @ExceptionHandler(ProductNotFoundException.class)
	    public ResponseEntity<?> elementNotFound() {
	        return ResponseEntity.notFound().build();
	    }
	}

}
