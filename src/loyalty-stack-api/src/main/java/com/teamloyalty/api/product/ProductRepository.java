package com.teamloyalty.api.product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	Optional<Product> findByCode(String code);
	
	List<Product> findByLevel1AndLevel2AndCodeBrand(String level1, String level2, String codeBrand);
	
	List<Product> findByLevel1AndLevel2(String level1, String level2);
	
	List<Product> findByLevel1AndCodeBrand(String level1, String codeBrand);
	
	List<Product> findByLevel2AndCodeBrand(String level2, String codeBrand);
	
	List<Product> findByLevel1(String level1);
	
	List<Product> findByLevel2(String level2);
	
	List<Product> findByCodeBrand(String codeBrand);
	
	List<Product> findByNameContainingIgnoreCase(String name);

}
