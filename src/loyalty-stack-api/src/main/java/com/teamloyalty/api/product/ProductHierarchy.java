package com.teamloyalty.api.product;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
class ProductHierarchy {
	
	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	@Column(unique=true)
	private Integer level;
	private String description;
	
	ProductHierarchy() {}
	
	ProductHierarchy(Integer level, String description) {
		this.level = level;
		this.description = description;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public Integer getLevel() {
		return this.level;
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public void setLevel(Integer level) {
		this.level = level;
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
		ProductHierarchy productHierarchy = (ProductHierarchy)o;
		return Objects.equals(this.id, productHierarchy.id) && Objects.equals(this.level, productHierarchy.level) &&
				Objects.equals(this.description, productHierarchy.description);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.level, this.description);
	}
	
	@Override
	public String toString() {
		return "ProductHierarchy(" + "id=" + this.id + ", level=" + this.level + ", description='" + this.description + "')";
	}
}
