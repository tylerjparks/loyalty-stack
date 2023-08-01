package com.teamloyalty.api.product;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	@Column(unique=true)
	private String code;
	private String name;
	private String description;
	private Double unitPrice;
	private String imageUrl;
	private String screenshot1;
	private String screenshot2;
	private String level1;
	private String level2;
	private String codeBrand;
		
	public Product() {}
	
	public Product(String code, String name, String description, Double unitPrice, String imageUrl, String screenshot1, String screenshot2, 
			String level1, String level2, String codeBrand) {
		this.code = code;
		this.name = name;
		this.description = description;
		this.unitPrice = unitPrice;
		this.imageUrl = imageUrl;
		this.screenshot1 = screenshot1;
		this.screenshot2 = screenshot2;
		this.level1 = level1;
		this.level2 = level2;
		this.codeBrand = codeBrand;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public String getCode() {
		return this.code;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public Double getUnitPrice() {
		return this.unitPrice;
	}
	
	public String getImageUrl() {
		return this.imageUrl;
	}
	
	public String getScreenshot1() {
		return this.screenshot1;
	}
	
	public String getScreenshot2() {
		return this.screenshot2;
	}
	
	public String getLevel1() {
		return this.level1;
	}
	
	public String getLevel2() {
		return this.level2;
	}
	
	public String getCodeBrand() {
		return this.codeBrand;
	}
	
	public void setCode(String code) {
		this.code = code;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	public void setScreenshot1(String screenshot1) {
		this.screenshot1 = screenshot1;
	}
	
	public void setScreenshot2(String screenshot2) {
		this.screenshot2 = screenshot2;
	}
	
	public void setLevel1(String level1) {
		this.level1 = level1;
	}
	
	public void setLevel2(String level2) {
		this.level2 = level2;
	}
	
	public void setCodeBrand(String codeBrand) {
		this.codeBrand = codeBrand;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof Product))
			return false;
		Product product = (Product)o;
		return Objects.equals(this.id, product.id) && Objects.equals(this.code, product.code) && Objects.equals(this.name, product.name) &&
				Objects.equals(this.description, product.description) && Objects.equals(this.unitPrice, product.unitPrice) &&
				Objects.equals(this.imageUrl, product.imageUrl) && Objects.equals(this.screenshot1, product.screenshot1) &&
				Objects.equals(this.screenshot2, product.screenshot2) && Objects.equals(this.level1, product.level1) &&
				Objects.equals(this.level2, product.level2) && Objects.equals(this.codeBrand, product.codeBrand);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.code, this.name, this.description, this.unitPrice, this.imageUrl, this.screenshot1, 
				this.screenshot2, this.level1, this.level2, this.codeBrand);
	}
	
	@Override
	public String toString() {
		return "Product(" + "id=" + this.id + ", code=" + this.code + ", name='" + this.name + "', description='" + this.description +
				"', unitPrice=" + this.unitPrice + ", imageUrl='" + this.imageUrl + "', screenshot1='" + this.screenshot1 + 
				"', screenshot2='" + this.screenshot2 + "', level1=" + this.level1 + ", level2=" + this.level2 +
				", codeBrand=" + this.codeBrand + ")";
	}
	
}
