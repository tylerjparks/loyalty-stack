package com.teamloyalty.api.product;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "hierarchyLevel", "levelCode" }) })
public class ProductLevel {
	
	private @Id @GeneratedValue Long id;
	private Long hierarchyLevel;
	private String levelCode;
	private String description;
	
	public ProductLevel() {}
	
	public ProductLevel(Long hierarchyLevel, String levelCode, String description) {
		this.hierarchyLevel = hierarchyLevel;
		this.levelCode = levelCode;
		this.description = description;
	}
	
	public Long getHierarchyLevel() {
		return this.hierarchyLevel;
	}
	
	public String getLevelCode() {
		return this.levelCode;
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public void setHiearchyLevel(Long hierarchyLevel) {
		this.hierarchyLevel = hierarchyLevel;
	}
	
	public void setLevelCode(String levelCode) {
		this.levelCode = levelCode;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof ProductLevel))
			return false;
		ProductLevel productLevel = (ProductLevel)o;
		return Objects.equals(this.id, productLevel.id) && Objects.equals(this.hierarchyLevel, productLevel.hierarchyLevel) &&
				Objects.equals(this.levelCode, productLevel.levelCode) && Objects.equals(this.description, productLevel.description);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.hierarchyLevel, this.levelCode, this.description);
	}
	
	@Override
	public String toString() {
		return "ProductLevel(" + "id=" + this.id + ", hierachyLevel=" + this.hierarchyLevel + ", levelCode=" + this.levelCode +
				", description='" + this.description + "')" ;
	}

}
