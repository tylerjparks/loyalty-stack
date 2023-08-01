package com.teamloyalty.api.product;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
class Brand {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	@Column(unique=true)
	private String codeBrand;
	private String description;
	
	Brand() {}
	
	Brand(String codeBrand, String description) {
		this.codeBrand = codeBrand;
		this.description = description;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public String getCodeBrand() {
		return this.codeBrand;
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public void setCodeBrand(String codeBrand) {
		this.codeBrand = codeBrand;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof Brand))
			return false;
		Brand brand = (Brand)o;
		return Objects.equals(this.id, brand.id) && Objects.equals(this.codeBrand, brand.codeBrand) &&
				Objects.equals(this.description, brand.description);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.codeBrand, this.description);
	}
	
	@Override
	public String toString() {
		return "Brand(" + "id=" + this.id + ", codeBrand=" + this.codeBrand + ", description='" + this.description + "')";
	}
	
}
